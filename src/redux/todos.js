import {createSlice} from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    editTodo: (state, action) => {
      const {id, text, completed} = action.payload;
      const todo = state.find(todoEl => todoEl.id === id);
      if (todo) {
        todo.text = text;
        todo.completed = completed;
      }
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      return state.filter(todo => todo.id !== id);
    },
  },
});

export const {addTodo, editTodo, deleteTodo} = todosSlice.actions;
export default todosSlice.reducer;
