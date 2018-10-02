import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity as ButtonText, StatusBar } from 'react-native';
import { Container, Form, Text, Item, Input, Button, Icon, View } from 'native-base';
import ScalableImage from 'react-native-scalable-image';
import { env, lib } from '../../global';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            username: null,
            password: null,
            loginFailed: false
        }
    }
    

    login = async () => {
        if (! this.state.username || ! this.state.password) {
            this.setState({loginFailed: true});
            return false;
        }

        this.setState({isLoading: true});
        await fetch(env.http.baseUrl+'auth/signin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.token) {
                this.setState({ loginFailed: false });
                lib.session.setUserToken(response.token);
                lib.session.setUserCredentials(this.state.username, this.state.password);
            } else {
                this.setState({ loginFailed: true, password: null });
            }

            this.setState({isLoading: false});
        })
        .catch(error => {
            this.setState({isLoading: false, loginFailed: true, password: null});
        });
    }

    _renderErrorMessage() {
        if (this.state.loginFailed)
            return (
                <Text style={styles.loginFailed}>{env.locale.jp.login_failed}</Text>
            );
    }

    _renderForm() {
        if (! this.state.isLoading)
        return (
            <View style={styles.formView}>
                <ScalableImage width={150} source={require('../../assets/images/logo.png')} />
                <ScalableImage style={{marginBottom: 15}} width={150} source={require('../../assets/images/logo_text.png')} />

                {this._renderErrorMessage()}
                <Form style={styles.loginForm}>
                    <Item icon regular style={[styles.loginInput, styles.loginInput1]}>
                        <Icon type="Entypo" name="user" style={{ color: env.colors.primary }}/>
                        <Input placeholder={env.locale.jp.username} value={this.state.username} autoCapitalize="none" onChangeText={(username) => this.setState({username: username})}/>
                    </Item>

                    <Item icon regular style={styles.loginInput}>
                        <Icon type="Entypo" name="lock" style={{ color: env.colors.primary }} />
                        <Input placeholder={env.locale.jp.password} value={this.state.password} secureTextEntry={true} onChangeText={(password) => this.setState({password: password})}/>
                    </Item>
                </Form>

                <Button block style={styles.loginButton} onPress={() => this.login()}>
                    <Text style={{ fontWeight: 'bold' }}>{env.locale.jp.login}</Text>
                </Button>

                <ButtonText style={styles.forgotPassword} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPassword}>{env.locale.jp.forgot_password}</Text>
                </ButtonText>
            </View>
        );
        else
        return <ActivityIndicator size="large" color={env.colors.primary}/>
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
    loginInput1: {
        borderBottomWidth: 0.5,
        borderBottomColor: env.colors.border
    },
    loginButton: {
        borderRadius: 5,
        backgroundColor: env.colors.primary,
        marginTop: 15,
        marginBottom: 15,
        height: 50
    },
    loginFailed: {
        color: 'red',
        marginBottom: 10
    },
    forgotPassword: {
        color: env.colors.primary,
    }
})