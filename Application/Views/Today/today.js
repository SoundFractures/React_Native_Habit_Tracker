import React, {Component, useState, useEffect, Fragment} from 'react';
import {View, FlatList, Button} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import firestore from '@react-native-firebase/firestore';
import {Text} from 'react-native-paper';
import TaskCard from './taskCard';
const TodayScreen = (props) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = props.user.uid;
  const ref = firestore().collection('Tasks').where('userId', '==', uid);

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {name, date, completed, notes, checklist} = doc._data;
        list.push({
          id: doc.id,
          name,
          date,
          completed,
          notes,
          checklist,
        });
      });

      if (loading) {
        setLoading(false);
      }

      setTodos(list);
    });
  }, []);
  return (
    <Fragment>
      <FlatList
        style={{flex: 1}}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TaskCard navigation={props.navigation} todo={item} />
        )}
      />
    </Fragment>
  );
};

export default withFirebaseHOC(TodayScreen);
