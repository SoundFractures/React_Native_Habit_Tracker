import React from 'react';
import {View} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import {Text} from 'react-native-paper';

const HomeView = (props) => {
  return (
    <View>
      <Text>Home3: {props.user.uid}</Text>
    </View>
  );
};

export default withFirebaseHOC(HomeView);
