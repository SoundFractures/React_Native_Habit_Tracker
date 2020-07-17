import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Firebase = {
  //utils
  onResult(QuerySnapshot) {
    console.log('Got Users collection result.');
  },

  onError(error) {
    console.error(error);
  },
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
  getHabits: (uid) => {
    let habits = [];
    firestore()
      .collection('Habits')
      .where('userId', '==', uid)
      .get()
      .then((querySnapshot) => {});

    console.log(habits);
  },
};

export default Firebase;
