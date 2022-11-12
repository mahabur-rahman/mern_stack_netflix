import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDnmh2rPSFvfrH8p5fUwCmpijETZ68mHiE",
  authDomain: "netflix-2-3c040.firebaseapp.com",
  projectId: "netflix-2-3c040",
  storageBucket: "netflix-2-3c040.appspot.com",
  messagingSenderId: "462109608908",
  appId: "1:462109608908:web:5be40ce71a047aefe1ab69",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;
