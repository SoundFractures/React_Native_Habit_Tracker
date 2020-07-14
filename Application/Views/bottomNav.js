import React from 'react';
import HabitsStack from './Habits/habitsStack';
import ProfileView from './Profile/index';
import TodayStack from './Today/todayStack';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Habits" component={HabitsStack} />
      <Tab.Screen name="Today" component={TodayStack} />
      <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  );
}

export default BottomNav;
