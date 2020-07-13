import auth from '@react-native-firebase/auth';
const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
  },
  signupWithEmail: (email, password) => {
    return auth().createUserWithEmailAndPassword(email, password);
  },
  signOut: () => {
    return auth().signOut();
  },
  checkUserAuth: (user) => {
    return auth().onAuthStateChanged(user);
  },

  // firestore
  createNewUser: (userData) => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData);
  },
};

export default Firebase;