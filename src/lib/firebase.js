
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyB2Lsy7rFiwa8IxRkhKxLbV_2Jvd88PK_k",
  authDomain: "react-redux-68a43.firebaseapp.com",
  projectId: "react-redux-68a43",
  storageBucket: "react-redux-68a43.appspot.com",
  messagingSenderId: "218932681086",
  appId: "1:218932681086:web:0d83e32238a22193f9bb2f",
  measurementId: "G-2CB72M2WWY",
  databaseURL:"https://react-redux-68a43-default-rtdb.firebaseio.com/"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);