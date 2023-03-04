import React, { useContext } from 'react';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {faCheckSquare} from '@fortawesome/free-regular-svg-icons';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';


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
    const taskClassName = "bg-slate-100/25 px-4 py-2 rounded-md shadow-lg shadow-black/10";
    const taskClassNameErr = "bg-slate-100/75 px-4 py-2 rounded-md shadow-lg shadow-black/10";

    return (
        <div key={index} className={todoDone ? taskClassName : taskClassNameErr }  >
            {editIndex === index ? (
                <form onSubmit={(event) => saveEditHandler(editIndex,editValue,event)} className="flex justify-between items-center">
                    <input type="text"
                        value={editValue}
                        onChange={editChangeHandler} 
                        autoFocus 
                        className={
                            empty ?
                             "basis-11/12 px-4 py-2 border-2 rounded-md border-pink-500 outline-0 placeholder:text-pink-500 animate-pulse" :
                              "rounded-md basis-10/12 px-4 border-2 border-pink-300 py-2 outline-0"
                            }
                        placeholder={empty ? 'Can\'t be empty!...' : ''} />
                    <button type='submit' >
                        <FontAwesomeIcon icon={faCheck} className={todoDone ? 
                            'text-xl cursor-pointer transition-all ease-in-out hover:text-green-300  shadow-green-500/40 ' :
                            'text-xl cursor-pointer transition-all ease-in-out hover:text-green-500  hover:shadow-green-500/40'} 
                        />
                    </button>
                    <span onClick={() => cancelEditHandler(editIndex)}>
                        <FontAwesomeIcon icon={faClose} className={todoDone ?
                             'text-xl mr-3 cursor-pointer transition-all ease-in-out hover:text-rose-500 hover:shadow-rose-500/40' :
                             'text-xl mr-3 cursor-pointer transition-all ease-in-out hover:text-rose-600 hover:shadow-rose-500/40'} 
                        />
                    </span>
                </form>
            ) : (
            <div className="flex justify-end gap-x-2 md:gap-0 md:justify-between items-center flex-wrap md:flex-nowrap">
                <span className={todoDone ?
                    "basis-full md:basis-9/12 text-md md:text-lg px-4 py-2 opacity-50 line-through decoration-2 decoration-pink-500" :
                    "basis-full md:basis-9/12 text-md md:text-lg px-4 py-2"}
                >
                    {todoText}
                </span>
                <span onClick={() => doneHandeler(index)}>
                    <FontAwesomeIcon icon={faCheckSquare}  className={todoDone ?
                         'text-lg align-[-4px] md:text-2xl transition-all ease-in-out cursor-pointer text-green-300 hover:text-black shadow-lg shadow-green-500/40 ' : 
                         'text-lg align-[-4px] md:text-2xl transition-all ease-in-out cursor-pointer hover:text-green-500 hover:shadow-green-500/40' }
                    /> 
                </span>
                <span onClick={() => editHandler(index, todoText)}>
                    <FontAwesomeIcon icon={faEdit} className={todoDone ?
                         'text-md md:text-xl cursor-pointer transition-all ease-in-out hover:text-pink-200 shadow-md hover:shadow-pink-400/40' :
                         'text-md md:text-xl cursor-pointer transition-all ease-in-out hover:text-pink-400 shadow-md hover:shadow-pink-400/40'}
                    />
                </span>
                <span onClick={() => deleteHandler(index)}>
                    <FontAwesomeIcon icon={faTrashAlt} className={todoDone ?
                         'text-md md:text-xl cursor-pointer transition-all ease-in-out hover:text-rose-500 shadow-md hover:shadow-rose-500/40 ' :
                         'text-md md:text-xl cursor-pointer transition-all ease-in-out hover:text-rose-600 shadow-md hover:shadow-rose-500/40 '}
                    />
                </span>
            </div>
            )}
        </div>
    );
};

export default Todo;