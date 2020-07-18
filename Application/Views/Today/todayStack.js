import React from 'react';
import {View, Button} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import {Text} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import TodayScreen from './today';
import EditTaskView from './editTask';

const Stack = createStackNavigator();
const TodayStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Today"
        options={{
          title: 'Tasks today',
          headerStyle: {
            backgroundColor: '#4d93f0',
          },
          headerTintColor: '#fff',
        }}>
        {(p) => <TodayScreen {...p} user={props.user} />}
      </Stack.Screen>
      <Stack.Screen
        name="Edit_Task"
        options={{
          title: 'Task 123',
          headerStyle: {
            backgroundColor: '#4d93f0',
          },
          headerTintColor: '#fff',
        }}>
        {(p) => <EditTaskView {...p} user={props.user} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default withFirebaseHOC(TodayStack);
