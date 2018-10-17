/** @format */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as PushNotifications from './features/PushNotifications'

AppRegistry.registerComponent(appName, () => App);

console.disableYellowBox = true;

export {
    PushNotifications
}
