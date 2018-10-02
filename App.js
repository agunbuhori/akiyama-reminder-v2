import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { createSwitchNavigator } from 'react-navigation';
import { Container } from 'native-base';
import AuthNavigator from './screens/AuthNavigator';

const AppNavigator = createSwitchNavigator({
  Auth: {screen: AuthNavigator}
});

export default class App extends Component {
  render() {
    return (
      <Container>
        <AppNavigator/>
      </Container>
    );
  }
}