import React, {Component, Fragment} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';
import ErrorMessage from '../Components/ErrorMessage';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Divider} from 'react-native-paper';
import {withFirebaseHOC} from '../../../Firebase';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('A name for your habit is required'),
  description: Yup.string().label('Description'),

  goal: Yup.number()
    .label('Goal')
    .min(1 | 'Set the goal between 1 and 100 days')
    .max(100 | 'Set the goal between 1 and 100 days')
    .required('Goal is required')
    .integer('Goal must be a number'),
});

class AddHabitView extends Component {
  state = {
    activeDays: [
      {
        name: 'Monday',
        active: false,
        id: 1,
      },
      {
        name: 'Tuesday',
        active: false,
        id: 2,
      },
      {
        name: 'Wednesday',
        active: false,
        id: 3,
      },
      {
        name: 'Thursday',
        active: false,
        id: 4,
      },
      {
        name: 'Friday',
        active: false,
        id: 5,
      },
      {
        name: 'Saturday',
        active: false,
        id: 6,
      },
      {
        name: 'Sunday',
        active: false,
        id: 7,
      },
    ],
  };
  handleDayChange(changeDay) {
    this.setState((state) => {
      const activeDays = state.activeDays.map((day, j) => {
        if (j === changeDay.id - 1) {
          return (day.active = !day.active);
        } else {
          return day;
        }
      });
      return activeDays;
    });
  }
  handleHabit = async (values, actions) => {
    const {name, description, goal} = values;
    let days = this.state.activeDays
      .filter(function (day) {
        return day.active == true;
      })
      .map(function ({name}) {
        return name;
      });

    try {
      const response = await this.props.firebase.addNewHabit(
        name,
        description,
        goal,
        days,
        this.props.user.uid,
      );

      if (response._documentPath) {
        this.props.navigation.pop();
      }
    } catch (error) {
      console.log(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  render() {
    //console.log(this.props);
    return (
      <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
        <Formik
          initialValues={{name: '', description: '', goal: 1}}
          onSubmit={(values, actions) => {
            this.handleHabit(values, actions);
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
              <FormInput
                name="goal"
                value={values.email}
                onChangeText={handleChange('goal')}
                placeholder="Enter goal count"
                autoCapitalize="none"
                onBlur={handleBlur('goal')}
              />
              <ErrorMessage errorValue={touched.goal && errors.goal} />
              <Divider style={{margin: 20}} />
              <View style={styles.avatarContaienr}>
                {this.state.activeDays.map((day) => {
                  return (
                    <Avatar.Text
                      key={day.id}
                      size={40}
                      label={day.name.charAt(0)}
                      color={!day.active ? '#4d93f0' : 'white'}
                      backgroundColor={!day.active ? 'white' : '#4d93f0'}
                      style={styles.avatarStyle}
                      onTouchEnd={() => this.handleDayChange(day)}
                    />
                  );
                })}
              </View>
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="Submit"
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
  }
}

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
  avatarStyle: {
    borderWidth: 2,
    borderColor: '#4d93f0',

    borderStyle: 'solid',
  },
});

export default withFirebaseHOC(AddHabitView);
