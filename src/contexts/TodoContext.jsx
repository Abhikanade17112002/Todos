import React, { createContext, useEffect, useState } from "react";
export const todoContext = createContext({
  todos: [],
  addTodo: (todo) => {},
  updateTodo: (_id, updatedTodo) => {},
  deleteTodo: (_id) => {},
  toggleTodoComplete: (_id) => {},
});

const TodoContext = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo) {
      return "An Empty Todo Cannot Be Added , Please Add Content. ";
    }

    setTodos((prevState) => [todo, ...prevState]);

    return "Todo Added Succesfully. ";
  };
  const updateTodo = (_id, updatedTodo) => {
    if (!_id) {
      return "Something Went Wrong ! , Unidentified ID. ";
    }

    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo?._id === _id) {
          return {
            ...updatedTodo,
          };
        }
        return todo;
      })
    );

    return "Updated Todo Succesfully. ";
  };

  const deleteTodo = (_id) => {
    if (!_id) {
      return "Something Went Wrong ! , Unidentified ID. ";
    }

    setTodos((prevState) => prevState.filter((todo) => todo?._id !== _id));

    return "Todo Deleted Succesfully. ";
  };
  const toggleTodoComplete = (_id) => {
    if (!_id) {
      return "Something Went Wrong ! , Unidentified ID. ";
    }

    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo?._id == _id) {
          

          return {
            ...todo,
            isComplete: !todo?.isComplete,
          };
        } else {
          return todo;
        }
      })
    );
  };

  // Getting todos From Local Storage
  useEffect(() => {
    const x = JSON.parse(localStorage.getItem("localTodos"));

    if (x && x.length > 0) {
      setTodos(x);
    }
  }, []);

  // Setting Updated Todos To The Local Storage
  useEffect(() => {
    localStorage.setItem("localTodos", JSON.stringify(todos));
  }, [todos]);
  return (
    <todoContext.Provider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodoComplete }}
    >
      {children}
    </todoContext.Provider>
  );
};

export default TodoContext;
