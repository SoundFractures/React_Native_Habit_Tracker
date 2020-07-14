import React from 'react';
import {View, Button} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import {Text} from 'react-native-paper';

const HomeView = (props) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default withFirebaseHOC(HomeView);
