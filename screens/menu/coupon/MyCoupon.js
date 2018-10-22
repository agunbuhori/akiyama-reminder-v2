import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Linking } from 'react-native';
import { Container, Text, Button, Icon, View, Content } from 'native-base';
import ScalableImage from 'react-native-scalable-image';
import Modal from "react-native-modal";
import Ripple from 'react-native-material-ripple';
import { env, lib } from '../../../global';

import HeaderComponent from '../../components/HeaderComponent';
import CouponSegment from './CouponSegment';

export default class MyCoupon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 0,
            data: [],
            refreshing: false,
            modalVisible: false,
            selectedCoupon: {}
        }
    }

    componentWillMount() {
        this._getData();
    }

    async _getData() {
        lib.session.getUserToken().then(token => {
            fetch(env.http.baseUrl + 'my-coupons', {
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

    handleRefresh() {
        this._getData();
    }


    _renderCoupons() {
        if (this.state.status === 1)
            return (
                <View style={{ alignItems: 'center', width: '100%', flex: 1, paddingLeft: 10, paddingRight: 10 }}>
                <Content style={styles.couponContent} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh.bind(this)} />}>
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.handleRefresh()}
                        renderItem={(item) =>
                            <View style={[styles.couponItem, { marginTop: item.index === 0 ? 10 : 0 }]}>
                                <View style={styles.couponImage}>
                                    <ScalableImage height={70} source={{uri: item.item.picture}}/>
                                </View>
                                <View style={styles.couponDescription}>
                                    <Text style={{fontWeight: 'bold'}}>{item.item.name}</Text>
                                    {
                                        item.item.date_scan === null
                                        ?
                                            <Text style={{ fontSize: 13, color: env.colors.primary }}>{lib.date.format(item.item.date_expired) + env.locale.jp.expired_on}</Text> 
                                        :
                                            <Text style={{ fontSize: 12, color: 'green' }}>{env.locale.jp.you_have_used_this_coupon}</Text>
                                    }
                                </View>
                                <View style={styles.couponIcon}>
                                    {
                                        item.item.date_scan === null 
                                        ?
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CouponScanner', { coupon: item.item })}>
                                                <Icon type="FontAwesome" name="qrcode" />
                                            </TouchableOpacity>
                                        :
                                            <Icon type="FontAwesome" style={{color: 'green'}} name="check-circle"/>
                                    }
                                    
                                </View>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Content>
                </View>
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
            <Modal style={{ margin: 0, justifyContent: 'flex-end' }} isVisible={this.state.modalVisible} onBackdropPress={() => this.setState({ modalVisible: false })}>

            </Modal>
        );
    }

    render() {
        return (
            <Container style={styles.container}>
                <HeaderComponent title={env.locale.jp.coupons} />
                <CouponSegment active={2} navigation={this.props.navigation}/>
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
        minHeight: 70,
        borderColor: env.colors.border,
        flexBasis: 0,
        flexGrow: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%'
    },
    couponDetail: {
        flexDirection: 'row'
    },
    couponName: {
        fontWeight: 'bold',
        color: env.colors.primary,
        marginBottom: 5
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
        margin: 0
    },
    couponText: {
        marginTop: 10,
        paddingTop: 10,
        borderTopColor: env.colors.border,
        borderTopWidth: 0.5
    },
    couponImage: {
        width: '30%'
    },
    couponDescription: {
        width: '60%',
        padding: 10
    },
    couponIcon: {
        width: '10%',
        alignItems: 'flex-end',
        marginTop: 10,
        paddingRight: 10
    }

});