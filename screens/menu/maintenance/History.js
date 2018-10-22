import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Container, Text, Button, Icon, View, Content, Tabs, Tab, ScrollableTab } from 'native-base';
import ScalableImage from 'react-native-scalable-image';
import Modal from "react-native-modal";
import Ripple from 'react-native-material-ripple';
import { env, lib } from '../../../global';

import HeaderComponent from '../../components/HeaderComponent';
import MaintenanceSegment from './MaintenanceSegment';

export default class History extends Component {
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
            fetch(env.http.baseUrl + 'my-histories', {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => {
                    this.setState({ status: 1, data: response, refreshing: false });
                });
        });
    }

    handleRefresh() {
        // this._getData();
    }

    _renderSchedule() {
        if (this.state.status === 1)
            return (
                <Content>
                    {this.state.data.map((year, index) => {
                        return ( 
                            <View style={styles.historyItem} key={index}>
                                <Text style={{fontWeight: 'bold', alignSelf: 'center', color: '#333'}}>{lib.date.formatYear(year.year)}</Text>

                                <FlatList
                                    data={year.periodes}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={(periode, index) =>
                                        <View style={[styles.periodeItem, { marginTop: parseInt(periode.index) == 0 ? 10 : 0 }]}>
                                            <View style={styles.periodeNumberDate}>
                                                <View style={styles.periodeNumber}>
                                                    <Text style={styles.periodeNumberText}>{lib.date.getMonth(periode.item.date)}</Text>
                                                </View>
                                                <View style={styles.periodeDate}>
                                                    <Text style={styles.periodeDateText}>{lib.date.getDay(periode.item.date)}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.periodeServices}>
                                                {periode.item.services.map((service, index) => {
                                                    return <Text style={styles.serviceText} key={index}>{'\u2022'} {service}</Text>
                                                })}
                                            </View>
                                        </View>
                                    }
                                />
                            </View>
                        )
                    })}
                </Content>
            );
        else
            return (
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator color={env.colors.primary} size="large" />
                </View>
            );
    }

    render() {
        return (
            <Container style={styles.container}>
                <HeaderComponent title={env.locale.jp.maintenance} />
                <MaintenanceSegment active={3} navigation={this.props.navigation} />

                {this._renderSchedule()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: env.colors.background,
    },
    periodeItem: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        flexDirection: 'row'
    },
    historyItem: {
        marginTop: 10
    }, 
    periodeNumberDate: {
        width: '20%',
        paddingRight: 10,
    },
    periodeNumber: {
        height: 25,
        backgroundColor: env.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4
    },
    periodeNumberText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13
    },
    periodeDate: {
        height: 25,
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderWidth: 0.5,
        borderColor: env.colors.border
    },
    periodeDateText: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    periodeServices: {
        width: '80%',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: env.colors.border,
        borderWidth: 0.5,
        overflow: 'hidden',
        minHeight: 70
    },
    serviceText: {
        color: '#333',
        fontSize: 14
    }
});