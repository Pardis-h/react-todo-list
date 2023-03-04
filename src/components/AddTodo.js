import React, { useContext } from 'react';

// Context
import { TodoContext } from '../context/TodoContextProvider';

const AddTodo = () => {
    const {submitHandler, inputTodo, inputChangeHandler} = useContext(TodoContext);

    return (
        <div className="flex justify-center">
          <form onSubmit={submitHandler}  className="flex sm:w-60 md:w-96 mb-8 shadow-lg shadow-black/10 ">
            <input type="text"
              value={inputTodo}
              onChange={inputChangeHandler} 
              autoFocus
              className="text-sm md:text-base block px-4 py-2 w-full flex-1 rounded-none rounded-l-md border-2 border-r-0 outline-0 border-white focus:border-pink-400 sm:text-sm "
            />
            <button type="submit" className="px-4 py-2 text-xs md:text-base text-white bg-pink-400 hover:bg-pink-500 focus:shadow-inner  rounded-none rounded-r-md transition-colors ease-in duration-300">Add</button>
          </form>
        </div>
    );
};

export default AddTodo;