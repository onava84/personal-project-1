import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyA5whq94UB_xgzQnucSlH4CLxNcN9s70Fk",
  authDomain: "soccer-calendar-4ad5c.firebaseapp.com",
  projectId: "soccer-calendar-4ad5c",
  storageBucket: "soccer-calendar-4ad5c.appspot.com",
  messagingSenderId: "1060084454976",
  appId: "1:1060084454976:web:82fd35cb79a403b98071a5",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
