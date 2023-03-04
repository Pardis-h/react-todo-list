import React, { useState, useEffect, createContext } from 'react';

export const TodoContext = createContext();

const TodoContextProvider = ({children}) => {

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
    }

    // Update edit input value
    const editChangeHandler = event => {
        setEditValue(event.target.value)
        if(event.target.value.trim()){
            setEmpty(false);
        }else{
            setEmpty(true)
        }
    }

    // Update the corresponding todo text in todos state and localStorage on save button click
    const saveEditHandler = (index, text, event) => {
        event.preventDefault();
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
    }
    const activeTodo = todos.filter(todo => !todo.done);
    const doneTodo = todos.filter(todo => todo.done);
    
    const filteredTodo = filter === "all" 
        ? todos 
        : filter === "active" 
            ? activeTodo
            : doneTodo;

    return (
        <TodoContext.Provider
            value={{
                todos,
                inputTodo,
                editIndex,
                editValue,
                filter,
                empty,
                inputChangeHandler,
                submitHandler,
                deleteHandler,
                editHandler,
                editChangeHandler,
                saveEditHandler,
                cancelEditHandler,
                doneHandeler,
                filterHandler,
                filteredTodo
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContextProvider;