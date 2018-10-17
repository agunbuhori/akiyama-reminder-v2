import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Icon } from 'native-base';
import ScalableImage from 'react-native-scalable-image';
import { env, lib } from '../../../global';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

const progressCustomStyles = {
    backgroundColor: env.colors.primary,
    borderRadius: 10,
    borderColor: env.colors.primary,
    height: 10,
    borderWidth: 2,
    width: env.dimensions.windowWidth - 40 - (env.dimensions.windowWidth * 15 / 100)
};

export default class MyCar extends Component {
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
            fetch(env.http.baseUrl + 'my-car', {
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

    _renderMyCar() {
        if (this.state.status === 0)
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={env.colors.primary} />
                </View>
            );
        else
            return (        
                    <Content>
                        <FlatList
                            data={this.state.data.services}
                            renderItem={(item) =>
                                <View style={[styles.service, {marginTop: item.index == 0 ? 10 : 0}]}>
                                    <View style={styles.icon}>
                                        <Icon type="Entypo" name={item.item.icon} style={{color: env.colors.primary}}/>
                                    </View>
                                    <View style={styles.value}>
                                        <Text>{item.item.name}</Text>
                                        <ProgressBarAnimated
                                            {...progressCustomStyles}
                                            barAnimationDuration={1000}
                                            value={parseInt(item.item.percent)}
                                        />
                                    </View>
                                </View>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </Content>
            );
    }

    render() {
        return (
            <Container style={styles.container}>
                <ScalableImage style={styles.carBackground} width={env.dimensions.windowWidth} source={require('../../../assets/images/background.png')} />
                {
                    this.state.status === 1
                    ?
                        <ScalableImage style={styles.car} width={env.dimensions.windowWidth / 2} source={{ uri: this.state.data.images }} />
                    :
                    null
                }
                {this._renderMyCar()}
                <TouchableOpacity style={{
                    position: 'absolute',
                    top: env.dimensions.statusBarHeight+10,
                    left: 10
                }} onPress={() => this.props.navigation.navigate('List')}>
                    <Icon style={{
                        fontSize: 40,
                        color: env.colors.primary
                    }} name="chevron-with-circle-left" type="Entypo"/>
                </TouchableOpacity>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: env.colors.background
    },
    car: {
        position: 'absolute',
        zIndex: 3,
        alignSelf: 'center',
        top: env.dimensions.windowWidth/2-100
    },
    service: {
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderColor: env.colors.border,
        borderWidth: 0.5,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row'
    },
    icon: {
        width: '15%'
    },
    value: {
        width: '85%'
    }
});