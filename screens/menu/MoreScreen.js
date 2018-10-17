import { createStackNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import transition from 'agunbuhori-rn-transition';

import ListMore from './more/ListMore';
import MyProfile from './more/MyProfile';
import { env } from '../../global';

const MoreScreen = createStackNavigator({
    List: { screen: ListMore, navigationOptions: {
        title: env.locale.jp.more, 
        headerStyle: {
            backgroundColor: env.colors.primary
        },
        headerTitleStyle: {
            color: 'white'
        }
    }},
    MyProfile: {
        screen: MyProfile, navigationOptions: {
            title: env.locale.jp.my_profile,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: env.colors.primary
            },
            headerTitleStyle: {
                color: 'white'
            }
        } }
}, {
    transitionConfig: transition
});

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: env.colors.primary
    }
});

export default MoreScreen;