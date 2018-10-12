import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Container, Text, Button, Icon, View, Content } from 'native-base';
import ScalableImage from 'react-native-scalable-image';
import Modal from "react-native-modal";
import Ripple from 'react-native-material-ripple';
import { env, lib } from '../../../global';

import HeaderComponent from '../../components/HeaderComponent';
import CouponSegment from './CouponSegment';

export default class CouponList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 0,
            data: [],
            refreshing: false,
            modalVisible: false,
            selectedCoupon: {},
            gettedCoupon: null
        }
    }

    componentWillMount() {
        this._getData();
    }

    async _getData() {
        lib.session.getUserToken().then(token => {
            fetch(env.http.baseUrl + 'list-coupons', {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                this.setState({ status: 1, data: response.data, refreshing: false });
            });
        });
    }

    async getCoupon(couponId, index) {
        this.setState({gettedCoupon: couponId});
        
        lib.session.getUserToken().then(token => {
            fetch(env.http.baseUrl + 'get-coupon', {
                method: "POST",
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: couponId
                })
            })
            .then(response => {
                this.setState({ gettedCoupon: null });
                this.state.data[index].has_booked = 1;
                this.forceUpdate();
            });
        });
    }

    handleRefresh() {
        this._getData();
    }

    _renderCoupons() {
        if (this.state.status === 1)
            return (
                <Content style={styles.couponContent} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh.bind(this)} />}>
                    <FlatList
                        numColumns={2}
                        data={this.state.data}
                        extraData={this.state}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.handleRefresh()}
                        renderItem={(item) =>
                            <View style={[styles.couponItem, { marginTop: item.index <= 1 ? 10 : 0 }]}>
                                <Ripple onPress={() => this.setState({selectedCoupon: item.item, modalVisible: true})}>
                                    <ScalableImage style={{minHeight: 110, backgroundColor: '#eee'}} source={{ uri: item.item.picture }} width={env.dimensions.windowWidth / 2 - 15} />
                                </Ripple>

                                <View style={[styles.couponDescription, { minHeight: 50 }]}>
                                    <Text style={styles.couponName}>{item.item.name}</Text>
                                </View>

                                

                                <View style={styles.couponDescription}>
                                    {
                                        item.item.has_booked == 0
                                            ?
                                            <Button style={styles.getButton} block small onPress={() => this.getCoupon(item.item.id, item.index)}>
                                                {this.state.gettedCoupon == item.item.id
                                                    ? <ActivityIndicator color={'white'} />
                                                    : <Text>{env.locale.jp.take}</Text>}
                                            </Button>
                                            :
                                            <Button disabled small block><Text>{env.locale.jp.has_taken}</Text></Button>
                                    }
                                    
                                </View>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Content>
            );
        else
            return (
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator color={env.colors.primary} size="large" />
                </View>
            );
    }

    _renderModal() {
        return (
            <Modal style={{ margin: 10 }} isVisible={this.state.modalVisible} onBackdropPress={() => this.setState({ modalVisible: false })}>
                <View style={styles.couponModal}>
                    <ScalableImage source={{ uri: this.state.selectedCoupon.picture }} width={env.dimensions.windowWidth} />
                    <View style={styles.couponDescription}>
                        <Text style={styles.couponName}>{this.state.selectedCoupon.name}</Text>
                
                        <View style={styles.couponDetail}>
                            <Icon style={styles.smallIcon} type="MaterialCommunityIcons" name="clock" />
                            <Text style={styles.smallText}>{this.state.selectedCoupon.date_expired + env.locale.jp.expired_on}</Text>
                        </View>

                        <View style={styles.couponDetail}>
                            <Text style={styles.smallText}>{this.state.selectedCoupon.desc}</Text>
                        </View>
                        <Button small style={styles.closeButton} onPress={() => this.setState({ modalVisible: false })}><Icon name="arrow-down" /></Button>
                    </View>
                </View>
            </Modal>
        );
    }

    render() {
        return (
            <Container style={styles.container}>
                <HeaderComponent title={env.locale.jp.coupons} />
                <CouponSegment active={1} navigation={this.props.navigation}/>
                {this._renderModal()}
                {this._renderCoupons()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: env.colors.background,
    },
    couponContent: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    couponItem: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: env.colors.border,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: 'white'
    },
    couponDescription: {
        padding: 10,
        backgroundColor: 'white',
    },
    couponDetail: {
        flexDirection: 'row'
    },
    couponName: {
        fontWeight: 'bold',
        color: env.colors.primary,
        marginBottom: 5,
        flexWrap: 'wrap',
        fontSize: 14
    },
    smallIcon: {
        fontSize: 16,
        marginRight: 5
    },
    smallText: {
        fontSize: 14,
    },
    couponModal: {
        backgroundColor: 'white',
        overflow: 'hidden',
        margin: 0,
        borderRadius: 10
    },
    couponText: {
        marginTop: 10,
        paddingTop: 10,
        borderTopColor: env.colors.border,
        borderTopWidth: 0.5
    },
    couponDescription: {
        width: '100%',
        overflow: 'hidden',
        padding: 10,
    },
    closeButton: {
        alignSelf: 'center',
        marginTop: 10
    }

});