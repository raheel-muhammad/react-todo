import React, { useState } from 'react'
import "./App.css"
export default function App() {
  const [inputvalue, setInputValue] = useState("")
  const [items, setItems] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [currIndex, setCurrIndex] = useState()


  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }
  const handleEnterKey = (event) => {
    if (event.key === 'Enter' && inputvalue.trim() !== '') {
      setItems([...items, inputvalue]);
      setInputValue('');
    }
  }
  const handleClick = () => {
    let item = inputvalue.trim()
    if (!item) {
      alert('please fill out this field')
    } else {
      if (isEdit) {
        let tempArr = [...items]
        tempArr[currIndex] = item
        setItems(tempArr)
        setInputValue('')
        setIsEdit(false)
      } else {
        setItems((prevItems) => [...prevItems, item]);
        setInputValue('')
      }
    }
  }
  const editClick = (item, index) => {
    setInputValue(item)
    setIsEdit(true)
    setCurrIndex(index)

  }
  const deleteItem = (index) => {
    let prev = [...items]
    prev.splice(index, 1)
    setItems(prev)

  }
  const resetItem = () => {
    setInputValue('')
    if (isEdit) {
      setIsEdit(false)
      setCurrIndex()
    }
  }

  return (
    <>
      <div className='container'>
        <div className="heading">Todo List</div>
        <div className='form'>
          <input className='input' type="text" maxLength={100} placeholder='Enter anything you want' value={inputvalue} onChange={handleInputChange} onKeyDown={handleEnterKey} />
          <div className='button-2'>
            <button className='btn btn-add' onClick={handleClick}>{isEdit ? "Edit" : "Add"}</button>
            <button className='btn btn-cancel' onClick={resetItem}>{isEdit ? 'Reset' : 'Cancel'}</button>
          </div>
        </div>


        <div className='ul-list'>

          {items.map((item, index) => (
            <div className='setting' style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px', backgroundColor: 'antiquewhite', borderRadius: '4px' }} >

              <div className='main' key={index}>{item}</div>
              <div className='main-btn'>
                <button className="btn-edit" onClick={() => editClick(item, index)}>Edit</button>
                <button className={isEdit ? "btn-l8grey" : "btn-delete"} onClick={() => deleteItem(index)} disabled={isEdit ? true : false} >Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}


