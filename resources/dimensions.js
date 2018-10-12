import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default dimensions = {
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
    statusBarHeight: getStatusBarHeight(true),
}