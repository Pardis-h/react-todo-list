import React, { useContext } from 'react';

// Context
import { TodoContext } from '../context/TodoContextProvider';

const Filter = () => {
    const {filterHandler} = useContext(TodoContext);

    return (
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
    );
};

export default Filter;