import React, {Component} from 'react';
import {View, Text} from 'react-native-paper';
import {withFirebaseHOC} from '../../Firebase';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeView from './Habits/index';
import LoginView from './Auth/login';

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
          console.log('No user found');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.isLoading) {
      // We haven't finished checking for the token yet
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.user != null ? (
            <Stack.Screen
              name="SignIn"
              options={{
                headerShown: false,
              }}>
              {(props) => <LoginView {...props} user={this.state.user} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Home">
              {(props) => <HomeView {...props} user={this.state.user} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default withFirebaseHOC(Initial);
