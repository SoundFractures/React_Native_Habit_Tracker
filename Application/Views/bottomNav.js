import React from 'react';
import HomeView from './Habits/index';
import ProfileView from './Profile/index';
import TodayView from './Today/index';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Habits" component={HomeView} />
      <Tab.Screen name="Today" component={TodayView} />
      <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  );
}

export default BottomNav;
