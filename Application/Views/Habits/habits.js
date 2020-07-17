import React, {Component} from 'react';
import ActionButton from 'react-native-action-button';
import {View, Button} from 'react-native';
import {Text} from 'react-native-paper';
import {withFirebaseHOC} from '../../../Firebase';

class HabitsScreen extends Component {
  state = {
    habits: [],
  };
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Habits! : {this.props.user.uid}</Text>
        <ActionButton
          buttonColor="rgba(77, 147, 240,1)"
          onPress={() => {
            this.props.navigation.navigate('Details');
          }}
        />
      </View>
    );
  }
}

export default withFirebaseHOC(HabitsScreen);
