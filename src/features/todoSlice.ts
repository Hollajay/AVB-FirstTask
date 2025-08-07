
import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [
      { task: "I want to go and watch" },
      { task: "how are you doing today" },
       { task: "I want to go and watch" },
      { task: "how are you doing today" },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    editTodo: (state, action) => {
      const { index, newTask } = action.payload;
      state.todos[index].task = newTask;
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((_, i) => i !== action.payload);
    },
  },
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
