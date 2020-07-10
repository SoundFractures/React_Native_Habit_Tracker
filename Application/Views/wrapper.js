import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Wrapper() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  function handleSignIn() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
  function handleSignOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text2) => setPassword(text2)}
          value={password}
        />
        <Button title="Sign in" onPress={handleSignIn} />
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
}
