import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'native-base';

import HomeScreen from './menu/HomeScreen';
import EventScreen from './menu/EventScreen';
import CouponScreen from './menu/CouponScreen';
import MaintenanceScreen from './menu/MaintenanceScreen';
import MoreScreen from './menu/MoreScreen';
import { env } from '../global';

const MenuIcon = (props) => ({
    render() {
        return <Icon type="Entypo" name={this.props.icon} style={[{ color: this.props.tintColor }, styles.bottomTabIcon]} />
    }
});

const MenuNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: env.locale.jp.home,
            tabBarIcon: ({ tintColor }) => (
                <MenuIcon tintColor={tintColor} icon="home" />
            )
        }
    },
    
    Event: {
        screen: EventScreen,
        navigationOptions: {
            tabBarLabel: env.locale.jp.events,
            tabBarIcon: ({ tintColor }) => (
                <MenuIcon tintColor={tintColor} icon="calendar" />
            )
        }
    },

    Coupon: {
        screen: CouponScreen,
        navigationOptions: {
            tabBarLabel: env.locale.jp.coupons,
            tabBarIcon: ({ tintColor }) => (
                <MenuIcon tintColor={tintColor} icon="colours" />
            )
        }
    },

    Maintenance: {
        screen: MaintenanceScreen,
        navigationOptions: {
            tabBarLabel: env.locale.jp.maintenance,
            tabBarIcon: ({ tintColor }) => (
                <MenuIcon tintColor={tintColor} icon="tools" />
            )
        }
    },

    List: {
        screen: MoreScreen,
        navigationOptions: {
            tabBarLabel: env.locale.jp.more,
            tabBarIcon: ({ tintColor }) => (
                <MenuIcon tintColor={tintColor} icon="list" />
            )
        }
    },

}, {
    tabBarOptions: {
        style: {
            borderTopColor: env.colors.border,
        }
    }
});

const styles = StyleSheet.create({
    bottomTabIcon: {
        fontSize: 24
    }
});

export default MenuNavigator;