import { RootState } from "./../../app/store";
import { createSlice } from "@reduxjs/toolkit";

export interface TodoState {
  id: string;
  name: string;
  completed: boolean;
  priority: string;
}

const initialState: TodoState[] = [
  {
    id: "1",
    name: "Learn React",
    completed: false,
    priority: "High",
  },
  {
    id: "2",
    name: "Learn Redux",
    completed: false,
    priority: "Medium",
  },
  {
    id: "3",
    name: "Learn Redux-Toolkit",
    completed: false,
    priority: "Low",
  },
];

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, toggleTodo } = todoListSlice.actions;

export const selectTodoList = (state: RootState) => {
  const { search, status, priority } = state.filters;
    const filteredTodos = state.todoList.filter((todo) => {
    const searchMatch = todo.name.toLowerCase().includes(search.toLowerCase());
    const statusMatch =
      status === "All" ? true : todo.completed === (status === "Completed");
    const priorityMatch =
      priority.length > 0 ? priority.includes(todo.priority) : true;
    return searchMatch && statusMatch && priorityMatch;
  });
  return filteredTodos;
};

export default todoListSlice.reducer;
