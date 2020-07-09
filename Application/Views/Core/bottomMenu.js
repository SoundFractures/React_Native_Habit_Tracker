import * as React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
//import {Button} from 'react-native-paper';
//import {createStackNavigator} from '@react-navigation/stack';

const HomeScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen123</Text>
    </View>
  );
};

//const Stack = createStackNavigator();
export default function BottomMenu() {
  return <Text>Bottom Menu</Text>;
}
