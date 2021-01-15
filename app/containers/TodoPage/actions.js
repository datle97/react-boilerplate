import {
  GET_TODOS_REQUEST,
  GET_TODOS_DONE,
  ADD_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  DELETE_TODO_DONE,
  COMPLETED_TODO_REQUEST,
  COMPLETED_TODO_DONE,
  EDIT_TODO_REQUEST,
  SELECT_TODO,
  UNSELECT_TODO,
  ADD_TODO_DONE,
  EDIT_TODO_DONE,
} from './constants';

// TODO LIST
export const loadTodosRequest = () => ({
  type: GET_TODOS_REQUEST,
});

export const loadTodosDone = payload => ({
  type: GET_TODOS_DONE,
  payload,
});

// ADD TODO
// (todo)???
export const addTodoRequest = payload => ({
  type: ADD_TODO_REQUEST,
  payload,
});
export const addTodoDone = payload => ({
  type: ADD_TODO_DONE,
  payload,
});

// DELETE TODO
export const deleteTodoRequest = payload => ({
  type: DELETE_TODO_REQUEST,
  payload,
});

export const deleteTodoDone = payload => ({
  type: DELETE_TODO_DONE,
  payload,
});

// COMPLETED TODO
export const completedTodoRequest = payload => ({
  type: COMPLETED_TODO_REQUEST,
  payload,
});

export const completedTodoDone = payload => ({
  type: COMPLETED_TODO_DONE,
  payload,
});

// SELECT UNSELECT TODO
export const selectTodo = payload => ({
  type: SELECT_TODO,
  payload,
});
export const unselectTodo = () => ({
  type: UNSELECT_TODO,
});

// EDIT TODO
export const editTodoRequest = payload => ({
  type: EDIT_TODO_REQUEST,
  payload,
});

export const editTodoDone = payload => ({
  type: EDIT_TODO_DONE,
  payload,
});
