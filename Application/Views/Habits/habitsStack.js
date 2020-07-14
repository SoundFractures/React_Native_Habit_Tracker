import React from 'react';
import {View, Button} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import {Text} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

function DetailsScreen(props) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details!</Text>
    </View>
  );
}

function HabitsScreen(props) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Habits!</Text>
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate('Details')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

const HabitsStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Habits" component={HabitsScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default withFirebaseHOC(HabitsStack);
