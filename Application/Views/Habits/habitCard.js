import React, {Fragment} from 'react';
import {List, Avatar} from 'react-native-paper';
import {withFirebaseHOC} from '../../../Firebase';
import {Text, View, StyleSheet} from 'react-native';

const HabitCard = ({navigation, habit}) => {
  return (
    <List.Item
      title={habit.name}
      description={habit.description}
      onPress={() => {
        navigation.navigate('Edit_Habit', {
          habit: habit,
        });
      }}
      right={(props) => (
        <Fragment>
          <View style={styles.container}>
            {habit.activeDays.map((day) => {
              return (
                <Avatar.Text
                  key={day.date}
                  size={40}
                  label={day.charAt(0)}
                  color="#4d93f0"
                  backgroundColor="white"
                  style={styles.avatarStyle}
                />
              );
            })}
          </View>
        </Fragment>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  avatarStyle: {
    borderWidth: 2,
    borderColor: '#4d93f0',
    height: 25,
    width: 25,
    borderStyle: 'solid',
    justifyContent: 'center',
    margin: 1,
  },
});

export default withFirebaseHOC(HabitCard);
