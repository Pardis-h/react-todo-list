import React, { useState, useEffect } from "react";

// Styles
// import styles from './App.module.css';

function App() {

  // States
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [filter, setFilter] = useState("all");
  const [empty, setEmpty] = useState(false);

  // Load todos from LocalStorage on mounting
  useEffect(() => {
    const data = localStorage.getItem("todos");
    if(data){
      setTodos(JSON.parse(data))
    }
  },[])

  // Save todos on LocalStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  //Event Handelers
  // Update InputTodo
  const inputChangeHandler = event => {
    setInputTodo(event.target.value)
  }

  // Add new todo
  const submitHandler = event => {
    event.preventDefault();
    if(inputTodo.trim()){
      setTodos([...todos, {text : inputTodo.trim() , done : false} ]);
      setInputTodo("");
    }
  }

  // Remove todo
  const deleteHandler = indexTodo => {
    setTodos(todos.filter((_, index) => index !== indexTodo))
  }

  // Edit button Handler
  const editHandler = (index, text) => {
    setEditIndex(index)
    setEditValue(text)
    console.log(index)
  }

  // Update edit input value
  const editChangeHandler = event => {
    setEditValue(event.target.value)
    if(event.target.value.trim()){
      setEmpty(true);
    }else{
      setEmpty(false)
    }
  }

  // Update the corresponding todo text in todos state and localStorage on save button click
  const saveEditHandler = (index, text) => {
    let newTodos = [...todos];
    if(text.trim()){
      newTodos[index].text = text.trim();
      setTodos(newTodos);
      localStorage.setItem('todos' , JSON.stringify(newTodos))
      setEditIndex(null);
      setEditValue('');
      setEmpty(false)
    }else{
      setEmpty(true);
    }
  }

  // Cnacel edit
  const cancelEditHandler = () => {
    setEditIndex(null)
  }

  // Toggle done state of corresponding todo in todos state and localStorage on done button click
  const doneHandeler = (index) => {
    let newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
    localStorage.setItem('todos' , JSON.stringify(newTodos));
  }

  // Filtering todos
  const filterHandler = event => {
    setFilter(event.target.value)
    console.log(event.target.value)
  }

  const filteredTodo = filter === "all" 
    ? todos 
    : filter === "active" 
      ? todos.filter(todo => !todo.done)
      : todos.filter(todo => todo.done);

  return (
    <div className="min-h-screen px-3 pb-10 flex justify-start items-center flex-col bg-gradient-to-r from-cyan-500 to-blue-500">
        <h1 className="text-center mb-5 mt-16 text-4xl">Todo</h1>
        <div className="flex justify-center">
          <form onSubmit={submitHandler}  className="flex w-96 mb-8">
            <input type="text"
              value={inputTodo}
              onChange={inputChangeHandler} 
              autoFocus
              className="block px-4 py-2 w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button type="submit" className="px-4 py-2 bg-slate-200 rounded-none rounded-r-md">Add</button>
          </form>
        </div>
        <div className="w-10/12 flex flex-col justify-center items-center">
          <div className="mb-4 w-full flex justify-around items-center gap-x-2">
            <div className="min-w-fit h-10 w-2/6 border-b-2 border-slate-100 border-solid relative">
              <label htmlFor="all-todo" className="w-full text-center p-1 h-full absolute">All</label>
              <input className="" type="radio" name="filter"  id="all-todo" value="all" onChange={filterHandler} defaultChecked/>
            </div>
            <div className="min-w-fit h-10 w-2/6 border-b-2 border-slate-100 border-solid relative">
              <label htmlFor="active-todo" className="w-full text-center p-1 h-full absolute">Active</label>
              <input className="" type="radio" name="filter" id="active-todo" value="active" onChange={filterHandler} />
            </div>
            <div className="min-w-fit h-10 w-2/6 border-b-2 border-slate-100 border-solid relative" >
              <label htmlFor="completed-todo" className="w-full text-center p-1 h-full absolute">Completed</label>
              <input className="" type="radio" name="filter" id="completed-todo" value="completed" onChange={filterHandler} />
            </div>
          </div>
          <div className="flex flex-col gap-y-4 mt-3 w-full">
            {filteredTodo.map((todo, index) => 
              <div key={index} className=" bg-slate-100/50 px-4 py-2 rounded-md">
                  {editIndex === index ? (
                    <form className="flex justify-between items-center">
                      <input type="text"
                        value={editValue}
                        onChange={editChangeHandler} 
                        autoFocus 
                        // className={empty ? styles.error : ''}
                        className="basis-10/12 px-4 py-2 "
                        placeholder={empty ? 'Can\'t be empty!...' : ''} />
                      <span onClick={() => saveEditHandler(editIndex,editValue)}>Save</span>
                      <span onClick={() => cancelEditHandler(editIndex)}>Cancel</span>
                    </form>
                  ) : (
                  <div className="flex justify-between items-center">
                    <span className="basis-9/12 px-4 py-2" style={{textDecoration : todo.done ? 'line-through' : 'none'}}>{todo.text}</span>
                    <span onClick={() => editHandler(index, todo.text)}>Edit</span>
                    <span onClick={() => doneHandeler(index)}>{todo.done ? "UnCompleted" : "Done"}</span>
                    <span onClick={() => deleteHandler(index)}>Delete</span>
                  </div>
                  )}
              </div>
            )}
          </div>
        </div>
    </div>
  );
}

export default App;
