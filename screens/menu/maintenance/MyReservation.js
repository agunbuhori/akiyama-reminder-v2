import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Container, Text, Button, Icon, View, Content, Tabs, Tab, ScrollableTab } from 'native-base';
import { env, lib } from '../../../global';

import HeaderComponent from '../../components/HeaderComponent';
import MaintenanceSegment from './MaintenanceSegment';

export default class MyReservation extends Component {
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
            fetch(env.http.baseUrl + 'my-book', {
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

    _renderMyReservation() {
        if (this.state.status === 1)
            return (
                <View>
                    {
                        this.state.data.code === null
                        ?
                        <View style={styles.myBooking}>
                            <Text style={{alignSelf: 'center'}}>{env.locale.jp.no_reservation}</Text>
                        </View>
                        :
                        <View>
                                <View style={styles.myBooking}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: env.colors.primary
                                    }}>{lib.date.format(this.state.data.date_booked) + " " + lib.date.formatTime(this.state.data.time)}</Text>
                                    <View style={{
                                        paddingTop: 10,
                                        marginTop: 10,
                                        borderTopColor: env.colors.border,
                                        borderTopWidth: 0.5,
                                        width: '100%',
                                        alignItems: 'center'
                                    }}>
                                        <Text>{this.state.data.store}</Text>
                                    </View>
                                </View>

                                <View style={[styles.myBooking, {marginTop: 0, alignItems: 'flex-start'}]}>
                                    {
                                        this.state.data.services.map((item, index) => {
                                            return <Text key={index} style={{ fontSize: 14 }}>{'\u2022'} {item}</Text>
                                        })
                                    }
                                </View>
                        </View>
                        
                    }
                </View>
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
                <MaintenanceSegment active={2} navigation={this.props.navigation} />

                {this._renderMyReservation()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: env.colors.background,
    },
    myBooking: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: env.colors.border,
        margin: 10,
        overflow: 'hidden',
        alignItems: 'center'
    }
});