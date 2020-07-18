import React, {useEffect, Fragment, useState} from 'react';
import {View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {withFirebaseHOC} from '../../../Firebase';
import * as Yup from 'yup';
import {Formik} from 'formik';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';
import ErrorMessage from '../Components/ErrorMessage';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Avatar,
  Divider,
  ProgressBar,
  Button,
  TextInput,
  List,
} from 'react-native-paper';

const validationSchema = Yup.object().shape({
  notes: Yup.string().label('Notes'),
});

const EditTaskView = (props) => {
  const {todo} = props.route.params;
  const [item, setItem] = useState('');
  const [items, setItems] = useState(todo.checklist);

  const handleItem = () => {
    setItems([
      ...items,
      {
        name: item,
        completed: false,
        date: new Date(),
      },
    ]);
  };
  const toggleItem = (index) => {
    items[index].completed = !items[index].completed;
    setItems(items);
  };
  const handleTodo = async (values, actions) => {
    const {notes} = values;
    try {
      const response = await props.firebase.updateTodo(todo.id, notes, items);
    } catch (error) {
      console.log(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <Formik
        initialValues={{notes: todo.notes}}
        onSubmit={(values, actions) => {
          handleTodo(values, actions);
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
              name="notes"
              value={values.notes}
              onChangeText={handleChange('notes')}
              placeholder="Enter task notes..."
              onBlur={handleBlur('notes')}
            />
            <ErrorMessage errorValue={touched.notes && errors.notes} />
            <FormInput
              value={item}
              onChangeText={(item) => setItem(item)}
              placeholder="Enter a checklist item..."
            />
            <Button
              onPress={() => {
                handleItem();
              }}>
              Add Item
            </Button>
            <Divider style={{margin: 20}} />
            <Fragment>
              <FlatList
                style={{flex: 1}}
                data={items}
                keyExtractor={(item) => item.date}
                renderItem={({item, index}) => (
                  <List.Item
                    onPress={() => toggleItem(index)}
                    title={item.name}
                    right={(props) => (
                      <List.Icon
                        {...props}
                        icon={item.completed ? 'check' : 'cancel'}
                      />
                    )}
                  />
                )}
              />
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
    </SafeAreaView>
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

export default withFirebaseHOC(EditTaskView);
