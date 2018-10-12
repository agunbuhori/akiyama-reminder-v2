import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Header, Body, Title } from 'native-base';
import { env, lib } from '../../global';

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Header style={styles.header}>
                <StatusBar barStyle="light-content"/>
                <Body>
                    <Title style={{color: 'white'}}>{this.props.title}</Title>
                </Body>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: env.colors.primary,
        borderBottomColor: 'transparent'
    }
});