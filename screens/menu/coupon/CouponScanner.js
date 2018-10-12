import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { env, lib } from '../../../global';

export default class CouponScanner extends Component {
    constructor(props) {
        super(props);
    }

    onSuccess(e) {
        if (this.props.navigation.state.params.coupon.id != e.data) {
            alert(env.locale.jp.coupon_code_not_match);
            setTimeout(() => {
                this.props.navigation.navigate('MyCoupon');
            }, 1000);
        } else {
            
            lib.session.getUserToken().then(token => {
                fetch(env.http.baseUrl + 'get-barcode/' + e.data, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Authorization': 'bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: e.data
                    })
                })
                .then(response => {
                    this.props.navigation.navigate('MyCoupon');
                });
            });
        }
    }

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
                topContent={
                    <View>
                        <Text style={styles.centerText}>
                            {env.locale.jp.scan_coupon}
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>
                            {this.props.navigation.state.params.coupon.name}
                        </Text>
                    </View>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.props.navigation.navigate('MyCoupon')}>
                        <Text style={styles.buttonText}>{env.locale.jp.cancel}</Text>
                    </TouchableOpacity>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});