import React, { useContext } from 'react';

// Context
import { TodoContext } from '../context/TodoContextProvider';

const Filter = () => {
    const {filterHandler} = useContext(TodoContext);

    return (
        <div className="mb-4 w-full flex justify-around items-center gap-x-2">
            <div className="min-w-fit h-10 md:h-12 w-2/6 relative">
                <input className="peer/draft invisible" type="radio" name="filter"  id="all-todo" value="all" onChange={filterHandler} defaultChecked/>
                <label htmlFor="all-todo" className="shadow-md w-full text-center -ml-3.5 p-2 pt-3 text-xs sm:text-md md:text-base h-full absolute rounded-t-lg cursor-pointer transition-all ease-in-out border-b-[3px] border-slate-100 peer-checked/draft:border-pink-400 hover:border-pink-400 peer-checked/draft:text-black text-white peer-checked/draft:bg-slate-100 bg-slate-100/20">All</label>
            </div>
            <div className="min-w-fit h-10 md:h-12 w-2/6 relative">
                <input className="peer/draft invisible" type="radio" name="filter" id="active-todo" value="active" onChange={filterHandler} />
                <label htmlFor="active-todo" className="shadow-md w-full text-center -ml-3.5 p-2 pt-3 text-xs sm:text-md md:text-base h-full absolute rounded-t-lg cursor-pointer transition-all ease-in-out border-b-[3px] border-slate-100 peer-checked/draft:border-pink-400 hover:border-pink-400 peer-checked/draft:text-black text-white peer-checked/draft:bg-slate-100 bg-slate-100/20">Active</label>
            </div>
            <div className="min-w-fit h-10 md:h-12 w-2/6 relative" >
                <input className="peer/draft invisible" type="radio" name="filter" id="completed-todo" value="completed" onChange={filterHandler} />
                <label htmlFor="completed-todo" className="shadow-md w-full text-center -ml-3.5 p-2 pt-3 text-xs sm:text-md md:text-base h-full absolute rounded-t-lg cursor-pointer transition-all ease-in-out border-b-[3px] border-slate-100 peer-checked/draft:border-pink-400 hover:border-pink-400 peer-checked/draft:text-black text-white peer-checked/draft:bg-slate-100 bg-slate-100/20">Completed</label>
            </div>
        </div>
    );
};

export default Filter;