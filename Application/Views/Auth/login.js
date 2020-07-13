import React from 'react';
import {View} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import {Text} from 'react-native-paper';

const LoginView = (props) => {
  return (
    <View>
      <Text>Login: {props.user.uid}</Text>
    </View>
  );
};

export default withFirebaseHOC(LoginView);
