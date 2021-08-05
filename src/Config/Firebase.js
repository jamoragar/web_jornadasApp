import firebase from 'firebase/app';
import 'firebase/analytics';
import "firebase/auth";
import 'firebase/database';

//PRODUCCIÓN
const firebaseConfig = {
    apiKey: "AIzaSyAVWH3AVZ11Jg9UyAixJLE5vop0ZIVm_S0",
    authDomain: "jornadas2020.firebaseapp.com",
    databaseURL: "https://jornadas2020.firebaseio.com",
    projectId: "jornadas2020",
    storageBucket: "jornadas2020.appspot.com",
    messagingSenderId: "741513696918",
    appId: "1:741513696918:web:9d4093bc4275f74b9c94b7",
    measurementId: "G-WRX4CX8XC5"
  };

//DESARROLLO
  // const firebaseConfig = {
  //   apiKey: "AIzaSyAPTMHn9Hp8vW1SqI5dUtF9HrtwTEUsE90",
  //   authDomain: "club-de-leones-desa.firebaseapp.com",
  //   projectId: "club-de-leones-desa",
  //   storageBucket: "club-de-leones-desa.appspot.com",
  //   messagingSenderId: "61554829947",
  //   appId: "1:61554829947:web:3927ee7901fcfc0cce10de"
  // };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const handleLogOut = () => {
  firebase.auth().signOut();
}

export default firebase;


