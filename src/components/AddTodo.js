import React, { useContext } from 'react';

// Context
import { TodoContext } from '../context/TodoContextProvider';

const AddTodo = () => {
    const {submitHandler, inputTodo, inputChangeHandler} = useContext(TodoContext);

    return (
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
    );
};

export default AddTodo;