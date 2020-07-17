import React, {Component, Fragment} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';
import ErrorMessage from '../Components/ErrorMessage';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Divider, ProgressBar} from 'react-native-paper';
import {withFirebaseHOC} from '../../../Firebase';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('A name for your habit is required'),
  description: Yup.string().label('Description'),
});

const EditHabitView = (props) => {
  const {habit} = props.route.params;
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const handleHabit = async (id, values, actions) => {
    const {name, description} = values;
    try {
      const response = await props.firebase.updateHabit(id, name, description);
    } catch (error) {
      console.log(error);
    } finally {
      actions.setSubmitting(false);
      props.navigation.pop();
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
      <Formik
        initialValues={{name: habit.name, description: habit.description}}
        onSubmit={(values, actions) => {
          handleHabit(habit.id, values, actions);
        }}
        validationSchema={validationSchema}>
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <Fragment>
            <FormInput
              name="name"
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder="Enter habit name"
              onBlur={handleBlur('name')}
            />
            <ErrorMessage errorValue={touched.name && errors.name} />
            <FormInput
              name="description"
              value={values.description}
              onChangeText={handleChange('description')}
              placeholder="Enter description"
              onBlur={handleBlur('description')}
            />
            <ErrorMessage
              errorValue={touched.description && errors.description}
            />

            <Divider style={{margin: 20}} />
            <View style={styles.avatarContaienr}>
              {days.map((day, index) => {
                return (
                  <Avatar.Text
                    key={day.id}
                    size={40}
                    label={day.charAt(0)}
                    color={
                      !habit.activeDays.includes(day) ? '#4d93f0' : 'white'
                    }
                    backgroundColor={
                      !habit.activeDays.includes(day) ? 'white' : '#4d93f0'
                    }
                    style={styles.avatarStyle}
                  />
                );
              })}
            </View>

            <Fragment>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <ProgressBar
                  progress={(habit.progress * 100) / habit.goal / 100}
                  color="#4d93f0"
                />
                <View style={styles.subProgressText}>
                  <Text style={{color: 'grey'}}>
                    {(habit.progress * 100) / habit.goal}%
                  </Text>
                  <Text style={{color: 'grey'}}>
                    {habit.progress} / {habit.goal} tasks
                  </Text>
                </View>
              </View>
            </Fragment>

            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={handleSubmit}
                title="OK"
                buttonColor="black"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
            </View>

            <ErrorMessage errorValue={errors.general} />
          </Fragment>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 25,
    height: 40,
  },
  avatarContaienr: {
    margin: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subProgressText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarStyle: {
    borderWidth: 2,
    borderColor: '#4d93f0',

    borderStyle: 'solid',
  },
});

export default withFirebaseHOC(EditHabitView);
