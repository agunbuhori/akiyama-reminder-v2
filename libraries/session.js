import { AsyncStorage } from 'react-native';

export default session = {
    setUserToken(token) {
        AsyncStorage.setItem('userToken', token);
    },

    setUserCredentials(username, password) {
        AsyncStorage.setItem('username', username);
        AsyncStorage.setItem('password', password);
    }
}