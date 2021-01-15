/* eslint-disable indent */
import produce from 'immer';
import {
  GET_TODOS_REQUEST,
  GET_TODOS_DONE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_DONE,
  ADD_TODO_REQUEST,
  COMPLETED_TODO_REQUEST,
  SELECT_TODO,
  UNSELECT_TODO,
  EDIT_TODO_REQUEST,
  ADD_TODO_DONE,
  COMPLETED_TODO_DONE,
  EDIT_TODO_DONE,
} from './constants';

export const initialState = {
  todoList: [],
  getTodos: {
    isLoading: false,
    error: false,
  },
  addTodo: {
    isLoading: false,
    error: false,
  },
  deleteTodo: {
    isLoading: null,
    error: false,
  },
  // complete
  completedTodo: {
    isLoading: null,
    error: false,
  },
  editTodo: {
    isLoading: null,
    error: false,
  },
  isActive: null,
};

/* eslint-disable default-case, no-param-reassign */
const todosReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // GET TODO LIST
      case GET_TODOS_REQUEST:
        draft.getTodos.isLoading = true;
        draft.getTodos.error = false;
        break;
      case GET_TODOS_DONE:
        draft.getTodos.isLoading = false;
        if (action.payload.status) {
          draft.todoList = action.payload.data;
        } else {
          draft.getTodos.error = action.payload.error;
        }
        break;
      // ADD TODO
      case ADD_TODO_REQUEST:
        // todo in addTodoRequest??????????
        draft.addTodo.isLoading = true;
        draft.addTodo.error = false;
        break;

      case ADD_TODO_DONE:
        draft.addTodo.isLoading = false;
        if (action.payload.status) {
          draft.todoList.push(action.payload.data);
        } else {
          draft.addTodo.error = action.payload.error;
        }
        break;

      // DELETE TODO
      case DELETE_TODO_REQUEST:
        draft.deleteTodo.isLoading = action.payload.id;
        draft.deleteTodo.error = false;
        break;
      case DELETE_TODO_DONE:
        draft.deleteTodo.isLoading = null;
        if (action.payload.status) {
          const index = draft.todoList.findIndex(
            todo => todo._id === action.payload.id,
          );
          if (index !== -1) draft.todoList.splice(index, 1);
        } else {
          draft.deleteTodo.error = action.payload.error;
          draft.deleteTodo.isLoading = null;
        }
        break;
      // COMPLETED TODO
      case COMPLETED_TODO_REQUEST:
        draft.completedTodo.isLoading = action.payload.id;
        draft.completedTodo.error = false;
        break;
      case COMPLETED_TODO_DONE:
        draft.completedTodo.isLoading = null;
        if (action.payload.status) {
          const index = draft.todoList.findIndex(
            todo => todo._id === action.payload.id,
          );
          if (index !== -1) {
            draft.todoList[index].completed = action.payload.data;
          }
        } else {
          draft.completedTodo.error = action.payload.error;
        }
        break;

      // SELECT UNSELECT TODO
      case SELECT_TODO:
        draft.isActive = action.payload.id;
        break;
      case UNSELECT_TODO:
        draft.isActive = null;
        break;

      // EDIT TODO
      case EDIT_TODO_REQUEST: {
        // action.todo ???
        draft.editTodo.isLoading = action.payload.id;
        draft.editTodo.error = false;
        break;
      }
      case EDIT_TODO_DONE:
        if (action.payload.status) {
          draft.editTodo.isLoading = null;
          const index = draft.todoList.findIndex(
            todo => todo._id === action.payload.id,
          );
          if (index !== -1)
            draft.todoList[index].description = action.payload.data;
          // unselectTodo after edit success
          draft.isActive = null;
        } else {
          draft.editTodo.error = action.payload.error;
          draft.editTodo.isLoading = null;
        }
        break;
    }
  });

export default todosReducer;
