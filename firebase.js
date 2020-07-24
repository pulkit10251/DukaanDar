import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyASH-pS6-FOO4BUVPjtcTVRnq-i6w1pmuw",
  authDomain: "dukaandar-e4590.firebaseapp.com",
  databaseURL: "https://dukaandar-e4590.firebaseio.com",
  projectId: "dukaandar-e4590",
  storageBucket: "dukaandar-e4590.appspot.com",
  messagingSenderId: "656725951077",
  appId: "1:656725951077:web:09e74bb2c42b202801bc8c",
  measurementId: "G-PC0HV6LFT1",
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
