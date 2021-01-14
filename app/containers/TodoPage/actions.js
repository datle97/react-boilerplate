import {
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_ERROR,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  COMPLETE_TODO_REQUEST,
  COMPLETE_TODO_SUCCESS,
  COMPLETE_TODO_ERROR,
  EDIT_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_ERROR,
  SELECT_TODO,
  UNSELECT_TODO,
} from './constants';

// TODO LIST
export const loadTodosRequest = () => ({
  type: LOAD_TODOS_REQUEST,
});

export const loadTodosSuccess = todoList => ({
  type: LOAD_TODOS_SUCCESS,
  todoList,
});

export const loadTodosError = error => ({
  type: LOAD_TODOS_ERROR,
  error,
});

// ADD TODO
// (todo)???
export const addTodoRequest = todo => ({
  type: ADD_TODO_REQUEST,
  todo,
});

export const addTodoSuccess = todo => ({
  type: ADD_TODO_SUCCESS,
  todo,
});

export const addTodoError = addError => ({
  type: ADD_TODO_ERROR,
  addError,
});

// DELETE TODO
export const deleteTodoRequest = id => ({
  type: DELETE_TODO_REQUEST,
  id,
});

export const deleteTodoSuccess = id => ({
  type: DELETE_TODO_SUCCESS,
  id,
});

export const deleteTodoError = deleteError => ({
  type: DELETE_TODO_ERROR,
  deleteError,
});

// COMPLETE TODO
export const completeTodoRequest = id => ({
  type: COMPLETE_TODO_REQUEST,
  id,
});

export const completeTodoSuccess = id => ({
  type: COMPLETE_TODO_SUCCESS,
  id,
});

export const completeTodoError = completeError => ({
  type: COMPLETE_TODO_ERROR,
  completeError,
});

// SELECT UNSELECT TODO
export const selectTodo = id => ({
  type: SELECT_TODO,
  id,
});
export const unselectTodo = () => ({
  type: UNSELECT_TODO,
});

// EDIT TODO
export const editTodoRequest = (id, todo) => ({
  type: EDIT_TODO_REQUEST,
  id,
  todo,
});

export const editTodoSuccess = (id, todo) => ({
  type: EDIT_TODO_SUCCESS,
  id,
  todo,
});

export const editTodoError = error => ({
  type: EDIT_TODO_ERROR,
  error,
});
