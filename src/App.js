import React, { useState } from 'react'
export default function App() {
  const [inputvalue, setInputValue] = useState("")
  const [items, setItems] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [currIndex, setCurrIndex] = useState()


  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }
  const handleClick = () => {
    if (inputvalue.trim() === '') {
      alert('please fill out this field')
    } else {
      if (isEdit) {
        setIsEdit(false)
        let tempArr = [...items]
        tempArr[currIndex] = inputvalue.trim()
        setItems(tempArr)
        setInputValue('')
      } else {
        setItems((prevItems) => [...prevItems, inputvalue.trim()]);
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
    } else {
      setIsEdit(true)
    }
    setIsEdit(false)
  }

  return (
    <>
      <div className='container'>
        <div className='form'>
          <input type="text" placeholder='Enter anything you want' value={inputvalue} onChange={handleInputChange} />
          <button onClick={handleClick}>{isEdit ? "edit" : "add"}</button>
          <button onClick={resetItem}>Cancel</button>

        </div>

        <ul>

          {items.map((item, index) => (
            <div style={{ display: 'flex', flexDirection: 'row' }} >

              <li key={index}>{item}</li>
              <button onClick={() => editClick(item, index)} style={{ color: 'red' }}>edit</button>
              <button onClick={() => deleteItem(index)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
      {/* <Home/> */}
    </>
  )
}


