import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC9_NAdVbgNyve1etr_EoxhC8vDHAugulQ",
  authDomain: "reactlab04.firebaseapp.com",
  projectId: "reactlab04",
  storageBucket: "reactlab04.appspot.com",
  messagingSenderId: "755821171010",
  appId: "1:755821171010:web:7da8d9ddaf81d0261478db",
  measurementId: "G-VDRGMWHG33"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
