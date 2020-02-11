// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDOqT0lKhsFIbNJAO1wI_n2j2wKEgjwoAs",
  authDomain: "cashflow-a13fb.firebaseapp.com",
  databaseURL: "https://cashflow-a13fb.firebaseio.com",
  projectId: "cashflow-a13fb",
  storageBucket: "cashflow-a13fb.appspot.com",
  messagingSenderId: "1096267079473"
};

firebase.initializeApp(config);

export default firebase;

export const db = firebase.database();

export const rooms = db.ref("/rooms");
