import auth from '@react-native-firebase/auth';
import app from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

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

  //habits


  onHabitChange: (uid) => {
    let habits = [];
    firestore()
      .collection('Habits')
      .where('userId', '==', uid)
      .onSnapshot((items) => {
        items._docs.map((habit) => habits.push(habit._data));
      });

    return habits;
  },

  getHabits: async (uid) => {
    let habits = [];
    await firestore()
      .collection('Habits')
      .where('userId', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot._docs.map((habit) => habits.push(habit._data));
      });
    return habits;
  },

  addNewHabit: (name, description, goal, activeDays, uid) => {
    console.log(uid);
    return firestore().collection('Habits').add({
      name: name,
      description: description,
      userId: uid,
      activeDays: activeDays,
      goal: goal,
      date: Date.now(),
      progress: 0,
    });
  },

  updateHabit: (id, name, description) => {
    return firestore().collection('Habits').doc(id).update({
      name: name,
      description: description
    });

  },
};

export default Firebase;