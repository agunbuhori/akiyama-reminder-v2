import { createStackNavigator } from 'react-navigation';
import AgunTransition from 'agunbuhori-rn-transition';

import LoginScreen from './auth/LoginScreen';
import MenuNavigator from './MenuNavigator';

const AuthNavigator = createStackNavigator({
    Login: {screen: LoginScreen, navigationOptions: { header: null }},
    Menu: {screen: MenuNavigator, navigationOptions: {header: null}}
}, {
    transitionConfig: AgunTransition
});

export default AuthNavigator;