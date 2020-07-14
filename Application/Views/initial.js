import React, {Component} from 'react';
import {View, Text} from 'react-native-paper';
import {withFirebaseHOC} from '../../Firebase';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginView from './Auth/login';
import BottomNav from './bottomNav';

export function SplashScreen(props) {
  return <Text>WAIT FOR USER BEMTI</Text>;
}

const Stack = createStackNavigator();

class Initial extends Component {
  constructor(props) {
    super(props);
    this.state = {user: '', isLoading: true};
  }

  componentDidMount = async () => {
    try {
      await this.props.firebase.checkUserAuth((u) => {
        if (u) {
          this.setState({
            user: u,
            isLoading: false,
          });
        } else {
          this.setState({
            user: u,
            isLoading: false,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={this.state.user ? 'App' : 'Login'}>
          <>
            <Stack.Screen
              name="Login"
              options={{
                headerShown: false,
              }}>
              {(props) => <LoginView {...props} user={this.state.user} />}
            </Stack.Screen>
            <Stack.Screen
              name="App"
              options={{
                headerShown: false,
              }}>
              {(props) => <BottomNav {...props} user={this.state.user} />}
            </Stack.Screen>
          </>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default withFirebaseHOC(Initial);
