import React, { useContext } from 'react';

// Context
import { TodoContext } from '../context/TodoContextProvider';

// Component
import Todo from './Todo';

const TodoList = () => {
    const {filteredTodo} = useContext(TodoContext);
    return (
        <div className="flex flex-col gap-y-4 mt-3 w-full">
            {filteredTodo.map((todo, index) => 
                <Todo key={index} todoText={todo.text} todoDone={todo.done} index={index}></Todo>
            )}
        </div>
    );
};

export default TodoList;