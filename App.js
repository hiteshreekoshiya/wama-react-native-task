import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import todosReducer from './src/redux/todos';
import TodoApp from './src/screens/TodoApp';

const store = createStore(todosReducer);

const App = () => {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
};

export default App;
