import React, {Component, Fragment} from 'react';
import {Text, View, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import {ScrollView} from 'react-native-gesture-handler';

import * as Yup from 'yup';
import {Formik} from 'formik';
import {Ionicons} from 'react-native-vector-icons';
import FormInput from './Components/FormInput';
import FormButton from './Components/FormButton';
import ErrorMessage from './Components/ErrorMessage';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters '),
});

class Login extends Component {
  //goToSignup = () => this.props.navigation.navigate('Signup');

  handleOnLogin = async (values, actions) => {
    const {email, password} = values;
    try {
      const response = await this.props.firebase.loginWithEmail(
        email,
        password,
      );

      if (response.user) {
        this.props.navigation.replace('App');
      }
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  state = {};
  render() {
    return (
      <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
        <Text style={styles.header}>Login</Text>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values, actions) => {
            this.handleOnLogin(values, actions);
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
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Enter email"
                autoCapitalize="none"
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Enter password"
                onBlur={handleBlur('password')}
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="LOGIN"
                  buttonColor="black"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
        <Text style={styles.switchText} onPress={() => setAuthMode(!authMode)}>
          Don't have an account? Sign Up!
        </Text>
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
  header: {
    color: '#4d93f0',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 50,
    marginBottom: 30,
    textAlign: 'center',
  },
  switchText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default withFirebaseHOC(Login);
