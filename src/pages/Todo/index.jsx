import { doc, updateDoc,getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../lib/firebase";
import "./style.css";
export default function Todo() {
  const [inputvalue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  console.log('items',items)
  const [isEdit, setIsEdit] = useState(false);
  const [currIndex, setCurrIndex] = useState();
  const state= useSelector(state=>state)
  console.log('state',state.loginUser.userId)


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  

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
  console.log('test first')
  const usersRef = doc(db, "users", state.loginUser.userId);
  await updateDoc(usersRef, {
    items:todoList
  }).then((res)=>{
    console.log('res update',res)
  }).catch(err=>{
    console.log('err update',err)
  });
}


const docRef = doc(db, "users", state.loginUser.userId);
const docSnap =  getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.items());
} else {
  console.log("No such document!");
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputvalue);
    setItems([...items, inputvalue]); 
    console.log('testig')
    if (isEdit) {
      editClick();
    } else {
      handleClick();
    }
  };

 
  return (
    <div className="container">
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
