import React from 'react';
import {View, Button} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import {Text} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import ActionButton from 'react-native-action-button';
import EditHabitView from './editHabit';
import HabitsScreen from './habits';
//https://reactnavigation.org/docs/params/

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
        {(p) => <HabitsScreen {...p} user={props.user} />}
      </Stack.Screen>
      <Stack.Screen
        name="Details"
        options={{
          title: 'Add/Edit Habit',
          headerStyle: {
            backgroundColor: '#4d93f0',
          },
          headerTintColor: '#fff',
        }}>
        {(p) => <EditHabitView {...p} user={props.user} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default withFirebaseHOC(HabitsStack);
