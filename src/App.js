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
  let disabled = !inputvalue.trim()
  const handleClick = () => {
    let item = inputvalue.trim()
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
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEdit) {
      editClick()
    } else {
      handleClick()
    }
  }

  return (
    <>
      <div className='container'>
        <div className="heading">Todo List</div>
        <form className='form' onSubmit={handleSubmit}>
          <input className='input' type="text" maxLength={100} placeholder='Enter anything you want' value={inputvalue} onChange={handleInputChange} />
          <div className='button-2'>
            <button className={`${!inputvalue.trim().length ? "light-grey" : "btn-add"}`} onClick={handleClick} disabled={disabled} type='submit'>{isEdit ? "Update" : "Add"}</button>
            <button className={`${!inputvalue ? "btn-1" : "btn-cancel"}`} onClick={resetItem} type='button'>{isEdit ? 'Reset' : 'Cancel'}</button>
          </div>
        </form>


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


