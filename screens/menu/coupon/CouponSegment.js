import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Segment, Button, Text, Icon } from 'native-base';
import { env, lib } from '../../../global';

export default class CouponSegment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Segment style={styles.segment}>
                <Button onPress={() => this.props.navigation.navigate('CouponList')} first style={[styles.segmentButton, styles.segmentButtonFirst, this.props.active == 1 ? styles.activeSegment : {}]}>
                    <Text style={[styles.segmentText, this.props.active == 1 ? styles.activeSegmentText : {}]}>{env.locale.jp.coupons}</Text>
                </Button>

                <Button onPress={() => this.props.navigation.navigate('MyCoupon')} last style={[styles.segmentButton, styles.segmentButtonLast, this.props.active == 2 ? styles.activeSegment : {}]}>
                    <Text style={[styles.segmentText, this.props.active == 2 ? styles.activeSegmentText : {}]}>{env.locale.jp.my_coupon}</Text>
                </Button>
            </Segment>
        );
    }
}

const styles = StyleSheet.create({
    segment: {
        backgroundColor: env.colors.primary
    },
    segmentButton: {
        backgroundColor: env.colors.primaryDark,
        width: (global.windowWidth - 20) / 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: env.colors.primaryDark,
    },
    segmentText: {
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    segmentButtonFirst: {
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
    },
    segmentButtonSecond: {

    },
    segmentButtonLast: {
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
    },
    activeSegment: {
        backgroundColor: '#fff'
    },
    activeSegmentText: {
        color: env.colors.primary
    },
})