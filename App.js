import React, {Component} from 'react';
import { StyleSheet, Text, View, AsyncStorage, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import { createSwitchNavigator } from 'react-navigation';
import { Container } from 'native-base';
import AuthNavigator from './screens/AuthNavigator';
import MenuNavigator from './screens/MenuNavigator';
import { env } from './global';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0
    }
  }

  componentDidMount() {
    this._getToken();
  }

  _getToken = async() => {
    await AsyncStorage.getItem('userToken').then(token => {
      if (token !== null)
        this.setState({status: 1});
        else
        this.setState({status: 2});
    });  
  }

  _renderFirstScreen() {
    switch(this.state.status) {
      case 0:
        return null;
        break;
      case 1:
        return <MenuNavigator/>
        break;
      case 2:
        return <AuthNavigator/>;
    }
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor={env.colors.primary}/>
        {this._renderFirstScreen()}
      </Container>
    );
  }
}