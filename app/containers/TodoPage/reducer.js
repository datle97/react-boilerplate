import produce from 'immer';
import { LOAD_TODOS, LOAD_TODOS_SUCCESS, LOAD_TODOS_ERROR } from './constants';

// The initial state of the Todo
export const initialState = {
  loading: false,
  error: false,
  todoList: [],
};

/* eslint-disable default-case, no-param-reassign */
const todoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TODOS:
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
    }
  });

export default todoReducer;
