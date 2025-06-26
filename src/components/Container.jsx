import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const Container = () => {

  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {

    let todosString = localStorage.getItem("items");
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("items"));
      setItems(todos);
    }

  }, []);

  const saveItems = (params) => {
    localStorage.setItem("items", JSON.stringify(items));
  }


  let handleEdit = (e, id) => {

    const confirmEdit = window.confirm("Are you sure you want to save the changes?");
    if (!confirmEdit) return;

    let t = items.filter(i => i.id === id);
    setItem(t[0].item);

    let newItems = items.filter(eachItem => {
      return eachItem.id !== id;
    })
    setItems(newItems);
    saveItems();
  }

  let handleDelete = (e, id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    let index = items.findIndex(eachItem => {
      return eachItem.id === id;
    })
    let newItems = items.filter(eachItem => {
      return eachItem.id !== id;
    })
    setItems(newItems);
    saveItems();
  }

  let handleAdd = () => {
    setItems([...items, { id: uuidv4(), item, isCompleted: false }]);

    setItem("");
    saveItems();

  }

  let handleChange = (e) => {
    setItem(e.target.value);
  }

  let handleCheckbox = (e) => {

    let id = e.target.name;
    let index = items.findIndex(eachItem => {
      return eachItem.id === id;
    })
    let newItems = [...items];
    newItems[index].isCompleted = !newItems[index].isCompleted;
    setItems(newItems);
    saveItems();
  }



  return (
    <div className='Container bg-violet-100 text-center mt-6  mx-64 p-6 rounded-xl min-h-[85vh] w-1/2'>
      {/* heading */}
      <h1 className='text-black text-2xl my-6 font-bold'>iTask - Manage your ToDo at one place</h1>
      <h2 className='flex justify-items-start'>Add a Todo</h2>

      {/* to add task */}
      <div className=' item flex  flex-wrap text-center items-center justify-between my-6' >
        <input
          onChange={handleChange}
          value={item}
          type="text"
          placeholder='Add task'
          className='bg-blue-300  p-2 mx-3 my-1 text-black rounded-2xl w-full' />

        <button onClick={handleAdd} className='bg-blue-700 hover:bg-blue-900  p-2 mx-3 my-1 text-white rounded-2xl font-bold w-full'>Save</button>
      </div>

      {/* to show task */}
      <p className='flex justify-items-start my-6'>show Finished</p>

      {/* to edit and delete task */}
      <h2 className='flex justify-items-start mb-3 font-bold'>Your Todos</h2>

      {items.length == 0 && <div className='m-3 flex justify-items-start'>No todos to display.</div>}

      {items.map(todo => {

        return <div className='items' key={todo.id}>
          <div className=' flex  flex-wrap text-center items-center justify-between'  >


            <div className={todo.isCompleted ? "line-through" : ""}>
              <input name={todo.id} type="checkbox" onChange={handleCheckbox} value={todo.isCompleted} />

              <span className='ml-2'>{todo.item}</span>
            </div>
            <div className='flex h-full'>
              <button onClick={(e) => { handleEdit(e, todo.id) }} className='bg-blue-700 hover:bg-blue-900 p-2 mx-2 my-1 text-white rounded-2xl font-bold'><MdEditSquare /></button>
              <button onClick={(e) => { handleDelete(e, todo.id) }} className='bg-blue-700 hover:bg-blue-900 p-2 mx-2 my-1 text-white rounded-2xl font-bold'><MdDelete /></button>
            </div>

          </div>
        </div>
      })}


    </div>
  )
}

export default Container

