import React from 'react';
import {View, Button} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import {Text} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import ActionButton from 'react-native-action-button';
import EditHabitView from './editHabit';

//https://reactnavigation.org/docs/params/
function HabitsScreen(props) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Habits!</Text>
      <ActionButton
        buttonColor="rgba(77, 147, 240,1)"
        onPress={() => {
          props.navigation.navigate('Details');
        }}
      />
    </View>
  );
}

const Stack = createStackNavigator();

const HabitsStack = (props) => {
  //console.log(props);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Habits"
        options={{
          title: 'Habits',
          headerStyle: {
            backgroundColor: '#4d93f0',
          },
          headerTintColor: '#fff',
        }}>
        {(props) => <HabitsScreen {...props} user={props.user} />}
      </Stack.Screen>
      <Stack.Screen
        name="Details"
        component={EditHabitView}
        options={{
          title: 'Add/Edit Habit',
          headerStyle: {
            backgroundColor: '#4d93f0',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default withFirebaseHOC(HabitsStack);
