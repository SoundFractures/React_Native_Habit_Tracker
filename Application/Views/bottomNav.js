import React from 'react';
import HabitsStack from './Habits/habitsStack';
import ProfileView from './Profile/index';
import TodayStack from './Today/todayStack';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

function BottomNav(props) {
  return (
    <Tab.Navigator
      activeColor="#fff"
      inactiveColor="#ddd"
      barStyle={{backgroundColor: '#4d93f0'}}>
      <Tab.Screen
        name="Habits"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}>
        {(navProps) => <HabitsStack {...navProps} user={props.user} />}
      </Tab.Screen>
      <Tab.Screen
        name="Today"
        options={{
          tabBarLabel: 'Today',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="check" color={color} size={26} />
          ),
        }}
        component={TodayStack}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}>
        {(navProps) => <ProfileView {...navProps} user={props.user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default BottomNav;
