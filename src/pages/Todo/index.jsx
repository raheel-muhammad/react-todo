import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../lib/firebase";
import { getAuth, signOut } from "firebase/auth";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { useEffect } from "react";
import { logOutUser } from "../../redux/actions";

export default function Todo() {
  const state= useSelector(state=>state)

  console.log(state.loginUser.userData.items,"123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputvalue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currIndex, setCurrIndex] = useState();
 
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(()=>{
   setItems (state.loginUser.userData.items||[])
  },[state.loginUser.userData.items])


  let disabled = !inputvalue.trim();
  const handleClick = async() => {
    let item = inputvalue.trim();
    if (isEdit) {
      let tempArr = [...items];
      tempArr[currIndex] = item;
      setItems(tempArr);
      setInputValue("");
      setIsEdit(false);
      updateDataToFirestore(tempArr);
     
    } else {
      let todoList=[...items, item]
      await updateDataToFirestore(todoList)
      setItems(todoList);
      setInputValue("");
    }

  };

  
  const editClick = (item, index) => {
    setInputValue(item);
    setIsEdit(true);
    setCurrIndex(index);
  };

  const deleteItem = (index) => {
    let prev = [...items];
    prev.splice(index, 1);
    setItems(prev);
    updateDataToFirestore(prev);
  };

  const resetItem = () => {
    setInputValue("");
    if (isEdit) {
      setIsEdit(false);
      setCurrIndex();
    }
  };
const updateDataToFirestore=async(todoList) => {
  const usersRef = doc(db, "users", state?.loginUser?.userId);
  await updateDoc(usersRef, {
    items:todoList
  }).then((res)=>{
    console.log('res update',res)
  }).catch(err=>{
    console.log('err update',err)
  });
}

const handleLogOut =async()=>{
const auth = await  getAuth();
await signOut(auth).then((res) => {
  console.log("auth",res);
  dispatch(logOutUser());
  navigate("/signin")
}).catch((error) => {
  console.log("error",error);
});
}

  const handleSubmit =  (e) => {
    e.preventDefault();
    console.log(inputvalue);
    setItems([...items, inputvalue]); 
    console.log('testing')
    if (isEdit) {
      editClick();
    } else {
      handleClick();
    }
  };

 


  return (
    <div className="container">
      <button className="log-out-btn" onClick={handleLogOut}>Log Out</button>
      <div className="heading">Todo List</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          maxLength={100}
          placeholder="Enter anything you want"
          value={inputvalue}
          onChange={handleInputChange}
        />
        <div className="button-2">
          <button
            className={`${
              !inputvalue.trim().length ? "light-grey" : "btn-add"
            }`}
            onClick={handleClick}
            disabled={disabled}
            type="submit"
          >
            {isEdit ? "Update" : "Add"}
          </button>
          <button
            className={`${!inputvalue ? "btn-1" : "btn-cancel"}`}
            onClick={resetItem}
            type="button"
          >
            {isEdit ? "Reset" : "Cancel"}
          </button>
        </div>
      </form>

      <div className="ul-list">
        {items?.map((item, index) => (
          <div
            className="setting"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "20px",
              backgroundColor: "lightgrey",
              borderRadius: "4px",
            }}
          >
            <div className="main" key={index}>
              {item}
            </div>
            <div className="main-btn">
              <button
                className="btn-edit"
                onClick={() => editClick(item, index)}
              >
                Edit
              </button>
              <button
                className={isEdit ? "btn-l8grey" : "btn-delete"}
                onClick={() => deleteItem(index)}
                disabled={isEdit ? true : false}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
