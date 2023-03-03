import React, { useContext } from 'react';

// Context
import { TodoContext } from '../context/TodoContextProvider';

const Todo = ({todoText, todoDone, index}) => {
    const {
        editIndex,
        editValue,
        editChangeHandler,
        empty,
        editHandler,
        doneHandeler,
        deleteHandler,
        saveEditHandler,
        cancelEditHandler
    } = useContext(TodoContext);

      // Task styles classNames:
    const taskClassName = "bg-slate-100/25 px-4 py-2 rounded-md";
    const taskClassNameErr = "bg-slate-100/75 px-4 py-2 rounded-md";

    return (
        <div key={index} className={todoDone ? taskClassName : taskClassNameErr }  >
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
                <span className="basis-9/12 px-4 py-2" style={{textDecoration : todoDone ? 'line-through' : 'none'}}>{todoText}</span>
                <span onClick={() => editHandler(index, todoText)}>Edit</span>
                <span onClick={() => doneHandeler(index)}>{todoDone ? "UnCompleted" : "Done"}</span>
                <span onClick={() => deleteHandler(index)}>Delete</span>
            </div>
            )}
        </div>
    );
};

export default Todo;