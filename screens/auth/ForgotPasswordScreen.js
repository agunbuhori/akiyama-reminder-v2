import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity as ButtonText, StatusBar } from 'react-native';
import { Container, Form, Text, Item, Input, Button, Icon, View } from 'native-base';
import ScalableImage from 'react-native-scalable-image';
import { env, lib } from '../../global';

export default class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            username: null
        }
    }


    send = async () => {
        
    }

    _renderErrorMessage() {
        if (this.state.loginFailed)
            return (
                <Text style={styles.loginFailed}>{env.locale.jp.login_failed}</Text>
            );
    }

    _renderForm() {
        if (!this.state.isLoading)
            return (
                <View style={styles.formView}>
                    <ScalableImage width={150} source={require('../../assets/images/logo.png')} />
                    <Text style={styles.forgotPasswordTitle}>{env.locale.jp.forgot_password}</Text>
                    {this._renderErrorMessage()}
                    <Form style={styles.loginForm}>
                        <Item icon regular style={styles.loginInput}>
                            <Icon type="Entypo" name="email" style={{ color: env.colors.primary }} />
                            <Input placeholder={env.locale.jp.username_or_email} value={this.state.username} autoCapitalize="none" onChangeText={(username) => this.setState({ username: username })} />
                        </Item>
                    </Form>

                    <Button block style={[styles.loginButton, { backgroundColor: env.colors.primary }]} onPress={() => this.send()}>
                        <Text style={{ fontWeight: 'bold' }}>{env.locale.jp.send}</Text>
                    </Button>

                    <Text>{env.locale.jp.or}</Text>

                    <Button warning block style={styles.loginButton} success onPress={() => this.send()}>
                        <Icon type="Entypo" name="phone"/>
                        <Text style={{ fontWeight: 'bold' }}>{env.locale.jp.call_admin}</Text>
                    </Button>

                    <ButtonText style={styles.forgotPassword} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.forgotPassword}>{env.locale.jp.login}</Text>
                    </ButtonText>
                </View>
            );
        else
            return <ActivityIndicator size="large" color={env.colors.primary} />
    }

    render() {
        return (
            <Container style={styles.container}>
                <StatusBar translucent={true}/>
                {this._renderForm()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: env.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    formView: {
        width: '100%',
        alignItems: 'center'
    },
    loginForm: {
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        borderWidth: 0.5,
        borderColor: env.colors.border
    },
    loginInput: {
        borderWidth: 0,
        borderColor: 'transparent',
        paddingLeft: 5,
        paddingRight: 5,
        height: 44
    },
    loginButton: {
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 15,
        height: 50
    },
    loginFailed: {
        color: 'red',
        marginBottom: 10
    },
    forgotPasswordTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 15,
        color: env.colors.primary
    },
    forgotPassword: {
        color: env.colors.primary,
    }
})