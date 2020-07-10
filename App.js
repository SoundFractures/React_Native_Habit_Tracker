import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import Wrapper from './Application/Views/wrapper';
import BottomMenu from './Application/Views/Core/bottomMenu';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaView>
      <NavigationContainer>
        <Wrapper />
      </NavigationContainer>
    </SafeAreaView>
  );
}
