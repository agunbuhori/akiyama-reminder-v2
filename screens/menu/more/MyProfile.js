import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Container, Content, Text } from 'native-base';
import ScalableImage from 'react-native-scalable-image';
import { env, lib } from '../../../global';
import HeaderComponent from '../../components/HeaderComponent';

export default class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            data: {}
        }
    }

    componentWillMount() {
        this._getData();
    }

    async _getData() {
        lib.session.getUserToken().then(token => {
            fetch(env.http.baseUrl + 'get-profile', {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => {
                    this.setState({ status: 1, data: response });
                })
                .catch(error => alert(JSON.stringify(error)));
        });
    }

    _renderProfile() {
        if (this.state.status === 0)
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color={env.colors.primary}/>
                </View>
            );
        else
            return (
                <Content>
                    <View style={styles.profile}>
                        <ScalableImage style={{ alignSelf: 'center' }} width={100} source={require('../../../assets/images/user.png')} />

                        <View style={styles.profileDescription}>
                            <View style={styles.profileItem}>
                                <View style={styles.profileLabel}>
                                    <Text style={styles.label}>{env.locale.jp.username}</Text>
                                </View>
                                <View style={styles.profileValue}>
                                    <Text>{this.state.data.username}</Text>
                                </View>
                            </View>

                            <View style={styles.profileItem}>
                                <View style={styles.profileLabel}>
                                    <Text style={styles.label}>{env.locale.jp.fullname}</Text>
                                </View>
                                <View style={styles.profileValue}>
                                    <Text>{this.state.data.fullname}</Text>
                                </View>
                            </View>

                            <View style={styles.profileItem}>
                                <View style={styles.profileLabel}>
                                    <Text style={styles.label}>{env.locale.jp.gender}</Text>
                                </View>
                                <View style={styles.profileValue}>
                                    <Text>{this.state.data.gender}</Text>
                                </View>
                            </View>

                            <View style={styles.profileItem}>
                                <View style={styles.profileLabel}>
                                    <Text style={styles.label}>{env.locale.jp.birthday}</Text>
                                </View>
                                <View style={styles.profileValue}>
                                    <Text>{lib.date.format(this.state.data.birthday)}</Text>
                                </View>
                            </View>

                            <View style={styles.profileItem}>
                                <View style={styles.profileLabel}>
                                    <Text style={styles.label}>{env.locale.jp.address}</Text>
                                </View>
                                <View style={styles.profileValue}>
                                    <Text>{this.state.data.address}</Text>
                                </View>
                            </View>

                            <View style={styles.profileItem}>
                                <View style={styles.profileLabel}>
                                    <Text style={styles.label}>{env.locale.jp.email}</Text>
                                </View>
                                <View style={styles.profileValue}>
                                    <Text>{this.state.data.email}</Text>
                                </View>
                            </View>

                            <View style={[styles.profileItem, {borderBottomWidth: 0}]}>
                                <View style={styles.profileLabel}>
                                    <Text style={styles.label}>{env.locale.jp.phone_number}</Text>
                                </View>
                                <View style={styles.profileValue}>
                                    <Text>{this.state.data.phone_number}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.profileDescription}>
                            <View style={styles.profileItem}>
                                <View style={styles.profileLabel}>
                                    <Text style={styles.label}>{env.locale.jp.police_number}</Text>
                                </View>
                                <View style={styles.profileValue}>
                                    <Text>{this.state.data.police_number}</Text>
                                </View>
                            </View>

                            <View style={[styles.profileItem, { borderBottomWidth: 0 }]}>
                                <View style={styles.profileLabel}>
                                    <Text style={styles.label}>{env.locale.jp.car_type}</Text>
                                </View>
                                <View style={styles.profileValue}>
                                    <Text>{this.state.data.car_type}</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </Content>
            );
    }

    render() {
        return (
            <Container style={styles.container}>
                {this._renderProfile()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: env.colors.background
    },
    profileWrapper: {
        height: 40,
        backgroundColor: env.colors.primary
    },
    profile: {
        padding: 15,
    },
    profileDescription: {
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 10,
        borderColor: env.colors.border,
        borderWidth: 0.5,
        marginTop: 15
    },
    profileItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: env.colors.border,
        borderBottomWidth: 0.5
    },
    profileLabel: {
        width: '30%'
    },
    profileValue: {
        width: '70%'
    },
    label: {
        fontWeight: 'bold'
    }
});