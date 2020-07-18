import React, {Fragment} from 'react';
import {List, Avatar} from 'react-native-paper';
import {withFirebaseHOC} from '../../../Firebase';
import {Text, View, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
const Today = ({navigation, todo}) => {
  async function toggleComplete() {
    await firestore().collection('Tasks').doc(todo.id).update({
      completed: !todo.completed,
    });
  }
  return (
    <List.Item
      title={todo.name}
      onPress={() => toggleComplete()}
      onLongPress={() =>
        navigation.navigate('Edit_Task', {
          todo: todo,
        })
      }
      right={(props) => (
        <List.Icon {...props} icon={todo.completed ? 'check' : 'cancel'} />
      )}
    />
  );
};

export default withFirebaseHOC(Today);
