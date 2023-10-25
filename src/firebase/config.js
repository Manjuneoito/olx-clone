import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA2AUcM8O05YBhcLaqMnWWOKtC7Cjiw754",
  authDomain: "olx-clone-5227f.firebaseapp.com",
  projectId: "olx-clone-5227f",
  storageBucket: "olx-clone-5227f.appspot.com",
  messagingSenderId: "1015856596318",
  appId: "1:1015856596318:web:d097c36136a0f717c0bbcf",
  measurementId: "G-PSTJL0NT3G",
};

export default firebase.initializeApp(firebaseConfig);
