import React from "react";

// Context
import TodoContextProvider from "./context/TodoContextProvider";

// Components
import AddTodo from "./components/AddTodo";
import Filter from "./components/Filter";
import TodoList from "./components/TodoList";

function App() {
  
  return (
    <TodoContextProvider>
      <div className="min-h-screen px-3 pb-10 flex justify-start items-center flex-col bg-gradient-to-r from-cyan-500 to-blue-500">
          <h1 className="text-center mb-5 mt-16 text-4xl">Todo</h1>
          <AddTodo/>
          <div className="w-10/12 flex flex-col justify-center items-center">
            <Filter/>
            <TodoList/>
          </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;

