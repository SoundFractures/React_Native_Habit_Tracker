import React, {Component, useState, useEffect, Fragment} from 'react';
import ActionButton from 'react-native-action-button';
import {View, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import {withFirebaseHOC} from '../../../Firebase';
import firestore from '@react-native-firebase/firestore';
import HabitCard from './habitCard';

const HabitsScreen = (props) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = props.user.uid;
  const ref = firestore().collection('Habits').where('userId', '==', uid);

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {
          name,
          description,
          goal,
          progress,
          activeDays,
          date,
          userId,
        } = doc._data;
        list.push({
          id: doc.id,
          name,
          description,
          goal,
          progress,
          activeDays,
          date,
          userId,
        });
      });

      if (loading) {
        setLoading(false);
      }

      setHabits(list);
    });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading Habits</Text>
      </View>
    );
  }
  return (
    <Fragment>
      <FlatList
        style={{flex: 1}}
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <HabitCard navigation={props.navigation} habit={item} />
        )}
      />
      <ActionButton
        buttonColor="rgba(77, 147, 240,1)"
        onPress={() => {
          props.navigation.navigate('Add_Habit');
        }}
      />
    </Fragment>
  );
};

export default withFirebaseHOC(HabitsScreen);
