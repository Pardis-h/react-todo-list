import React, { useState, useEffect } from "react";

// Styles
import styles from './App.module.css';

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

  // Event Handelers

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
    <div className="App">
        <h1>Todo</h1>
        <form onSubmit={submitHandler}>
          <input type="text" value={inputTodo} onChange={inputChangeHandler} autoFocus />
          <button type="submit">Add</button>
        </form>
        <div>
          <label htmlFor="all-todo">All</label>
          <input type="radio" name="filter"  id="all-todo" value="all" onChange={filterHandler} defaultChecked/>
          <label htmlFor="active-todo">Active</label>
          <input type="radio" name="filter" id="active-todo" value="active" onChange={filterHandler} />
          <label htmlFor="completed-todo">Completed</label>
          <input type="radio" name="filter" id="completed-todo" value="completed" onChange={filterHandler} />
        </div>
        <div>
          {filteredTodo.map((todo, index) => 
            <div key={index}>
                {editIndex === index ? (
                  <form >
                    <input type="text"
                      value={editValue}
                      onChange={editChangeHandler} 
                      autoFocus 
                      className={empty ? styles.error : ''}
                      placeholder={empty ? 'Can\'t be empty!...' : ''} />
                    <span onClick={() => saveEditHandler(editIndex,editValue)}>Save</span>
                    <span onClick={() => cancelEditHandler(editIndex)}>Cancel</span>
                  </form>
                ) : (
                <div>
                  <span style={{textDecoration : todo.done ? 'line-through' : 'none'}}>{todo.text}</span>
                  <span onClick={() => editHandler(index, todo.text)}>Edit</span>
                  <span onClick={() => doneHandeler(index)}>Done</span>
                  <span onClick={() => deleteHandler(index)}>Delete</span>
                </div>
                )}
            </div>
          )}
        </div>
    </div>
  );
}

export default App;
