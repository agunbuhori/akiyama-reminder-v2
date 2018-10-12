import { AsyncStorage } from 'react-native';

export default session = {
    setUserToken(token) {
        AsyncStorage.setItem('userToken', token);
    },

    setUserCredentials(username, password) {
        AsyncStorage.setItem('credentials', JSON.stringify({username: username, password: password}));
    },

    async getUserToken() {
        return await AsyncStorage.getItem('userToken');
    },

    async reLogin() {
        await AsyncStorage.getItem('credentials').then(credentials => {
            fetch(env.http.baseUrl + 'auth/signin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: credentials
            })
            .then(response => response.json())
            .then(response => {
                AsyncStorage.setItem('userToken', response.token);
            });
        });
    }
}