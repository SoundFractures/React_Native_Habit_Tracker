import React from 'react';
import {View, Button} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import {Text} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

function DetailsScreen2(props) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details!</Text>
    </View>
  );
}
//https://reactnavigation.org/docs/params/
const TodayScreen = (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Habits!</Text>
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate('Details2')}
      />
    </View>
  );
};

const Stack = createStackNavigator();
const TodayStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Today"
        component={TodayScreen}
        options={{
          title: 'Tasks today',
          headerStyle: {
            backgroundColor: '#4d93f0',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Details2"
        component={DetailsScreen2}
        options={{
          title: 'Task 123',
          headerStyle: {
            backgroundColor: '#4d93f0',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default withFirebaseHOC(TodayStack);
