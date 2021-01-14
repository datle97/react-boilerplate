import produce from 'immer';
import {
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_ERROR,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  COMPLETE_TODO_REQUEST,
  COMPLETE_TODO_SUCCESS,
  COMPLETE_TODO_ERROR,
  SELECT_TODO,
  UNSELECT_TODO,
  EDIT_TODO_REQUEST,
  EDIT_TODO_ERROR,
  EDIT_TODO_SUCCESS,
} from './constants';

export const initialState = {
  todoList: [],
  loading: false,
  error: false,
  addLoading: false,
  addError: false,
  deleteLoading: null,
  deleteError: false,
  completeLoading: null,
  completeError: false,
  // is Editing
  editingTodo: null,
  //
  editLoading: null,
  editError: false,
};

/* eslint-disable default-case, no-param-reassign */
const todosReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // FETCH TODO LIST
      case LOAD_TODOS_REQUEST:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_TODOS_SUCCESS:
        draft.loading = false;
        draft.todoList = action.todoList;
        break;
      case LOAD_TODOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      // ADD TODO
      case ADD_TODO_REQUEST:
        // todo in addTodoRequest??????????
        draft.addLoading = true;
        draft.addError = false;
        break;
      case ADD_TODO_SUCCESS:
        draft.addLoading = false;
        draft.todoList.push(action.todo);
        break;
      case ADD_TODO_ERROR:
        draft.addError = action.addError;
        draft.addLoading = false;
        break;

      // DELETE TODO
      case DELETE_TODO_REQUEST:
        draft.deleteLoading = action.id;
        draft.deleteError = false;
        break;
      case DELETE_TODO_SUCCESS: {
        draft.deleteLoading = null;
        const index = draft.todoList.findIndex(todo => todo._id === action.id);
        if (index !== -1) draft.todoList.splice(index, 1);
        break;
      }
      case DELETE_TODO_ERROR:
        draft.deleteError = action.deleteError;
        draft.deleteLoading = null;
        break;

      // COMPLETE TODO
      case COMPLETE_TODO_REQUEST:
        draft.completeLoading = action.id;
        draft.completeError = false;
        break;
      case COMPLETE_TODO_SUCCESS: {
        draft.completeLoading = null;
        const index = draft.todoList.findIndex(todo => todo._id === action.id);
        if (index !== -1)
          draft.todoList[index].completed = !draft.todoList[index].completed;
        break;
      }
      case COMPLETE_TODO_ERROR:
        draft.completeError = action.completeError;
        draft.completeLoading = null;
        break;

      // SELECT UNSELECT TODO
      case SELECT_TODO:
        draft.editingTodo = action.id;
        break;
      case UNSELECT_TODO:
        draft.editingTodo = null;
        break;

      // EDIT TODO
      case EDIT_TODO_REQUEST:
        // action.todo ???
        draft.editLoading = action.id;
        draft.editError = false;
        break;
      case EDIT_TODO_SUCCESS: {
        draft.editLoading = null;
        const index = draft.todoList.findIndex(todo => todo._id === action.id);
        if (index !== -1) draft.todoList[index].description = action.todo;
        // unselectTodo after edit success
        draft.editingTodo = null;
        break;
      }
      case EDIT_TODO_ERROR:
        draft.editError = action.editError;
        draft.editLoading = null;
        break;
    }
  });

export default todosReducer;
