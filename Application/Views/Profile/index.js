import React from 'react';
import {View, Button} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import {Text} from 'react-native-paper';

const ProfileView = (props) => {
  function handleSignOut() {
    try {
      props.firebase.signOut();
      props.navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text>Profile: {props.user.email}</Text>
      <Button title="Sign Out" onPress={() => handleSignOut()}></Button>
    </View>
  );
};

export default withFirebaseHOC(ProfileView);
