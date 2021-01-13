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
} from "./constants";

// TODO_REQUEST LIST
export const loadTodosRequest = () => ({
  type: LOAD_TODOS_REQUEST,
});

export const loadTodosSuccess = (todoList) => ({
  type: LOAD_TODOS_SUCCESS,
  todoList,
});

export const loadTodosError = (error) => ({
  type: LOAD_TODOS_ERROR,
  error,
});

// ADD TODO_REQUEST
// (todo)???
export const addTodoRequest = (todo) => ({
  type: ADD_TODO_REQUEST,
  todo,
});

export const addTodoSuccess = (todo) => ({
  type: ADD_TODO_SUCCESS,
  todo,
});

export const addTodoError = (addError) => ({
  type: ADD_TODO_ERROR,
  addError,
});

// DELETE TODO_REQUEST
export const deleteTodoRequest = (_id) => ({
  type: DELETE_TODO_REQUEST,
  _id,
});

export const deleteTodoSuccess = (_id) => ({
  type: DELETE_TODO_SUCCESS,
  _id,
});

export const deleteTodoError = (deleteError) => ({
  type: DELETE_TODO_ERROR,
  deleteError,
});

// COMPLETE TODO_REQUEST
export const completeTodoRequest = (_id) => ({
  type: COMPLETE_TODO_REQUEST,
  _id,
});

export const completeTodoSuccess = (_id) => ({
  type: COMPLETE_TODO_SUCCESS,
  _id,
});

export const completeTodoError = (completeError) => ({
  type: COMPLETE_TODO_ERROR,
  completeError,
});
