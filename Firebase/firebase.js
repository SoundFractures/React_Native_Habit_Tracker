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

  addNewHabit: async (name, description, goal, activeDays, uid) => {

    const res = await firestore().collection('Habits').add({
      name: name,
      description: description,
      userId: uid,
      activeDays: activeDays,
      goal: goal,
      date: new Date(),
      progress: 0,
    });
    Firebase.newTasks(uid, res._documentPath._parts[1], name)
    return res;
  },

  newTasks: async (uid, habitId, name) => {
    //Implement Logic for filtering tasks
    const res = await firestore().collection('Tasks').add({
      userId: uid,
      habitId: habitId,
      date: new Date(),
      name: name,
      checklist: [],
      completed: false,
      notes: ""
    });

  },

  updateTodo: (id, notes, checklist) => {
    return firestore().collection('Tasks').doc(id).update({
      notes: notes,
      checklist: checklist,
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