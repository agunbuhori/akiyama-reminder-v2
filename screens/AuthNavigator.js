import { createSwitchNavigator } from 'react-navigation';

import AgunTransition from 'agunbuhori-rn-transition';

import LoginScreen from './auth/LoginScreen';
import ForgotPasswordScreen from './auth/ForgotPasswordScreen';

const AuthNavigator = createSwitchNavigator({
    Login: {screen: LoginScreen, navigationOptions: { header: null }},
    ForgotPassword: {screen: ForgotPasswordScreen, navigationOptions: { header: null }},
}, {
    transitionConfig: AgunTransition
});

export default AuthNavigator;