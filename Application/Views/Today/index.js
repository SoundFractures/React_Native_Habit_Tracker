import React from 'react';
import {View, Button} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import {Text} from 'react-native-paper';

const TodayView = (props) => {
  return (
    <View>
      <Text>Today</Text>
    </View>
  );
};

export default withFirebaseHOC(TodayView);
