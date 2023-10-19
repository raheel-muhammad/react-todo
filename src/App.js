import React from "react";
import Router from "./router/Router";
import { getUserId } from "./redux/actions";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "./lib/firebase";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUserData } from "./redux/actions/loginUser";


const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [items, setItems] = useState([]);

  const getCurrentUser = async () => {
    const auth = await getAuth();
    auth.onAuthStateChanged(async (user) => {
      console.log('user',user)
      if(user){

        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const getdata = docSnap.data();
        console.log("Document data:", docSnap.data());
        setItems(getdata);
        dispatch(getUserData(getdata));
      } else {
        console.log("No such document!");
      }
    } 
    });
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  return <Router />;
};

export default App;
