import axios from 'axios';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  addTodoError,
  addTodoSuccess,
  completeTodoError,
  completeTodoSuccess,
  deleteTodoError,
  deleteTodoSuccess,
  editTodoError,
  editTodoSuccess,
  loadTodosError,
  loadTodosSuccess,
} from './actions';
import {
  ADD_TODO_REQUEST,
  COMPLETE_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  EDIT_TODO_REQUEST,
  LOAD_TODOS_REQUEST,
} from './constants';
import { makeSelectTodoById } from './selectors';

const url = `https://api-nodejs-todolist.herokuapp.com/task`;
const authHeaders = {
  headers: {
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
  },
};

export function* getTodos() {
  // const todos = yield select(makeSelectTodoList());
  try {
    const response = yield call(axios.get, url, authHeaders);
    const { data } = response.data;
    yield put(loadTodosSuccess(data));
  } catch (err) {
    yield put(loadTodosError(err));
  }
}

export function* getAdd(action) {
  try {
    const response = yield call(
      axios.post,
      url,
      { description: action.todo },
      authHeaders,
    );
    const { data } = response.data;
    yield put(addTodoSuccess(data));
  } catch (err) {
    yield put(addTodoError(err));
  }
}

export function* getDelete(action) {
  try {
    const response = yield call(
      axios.delete,
      `${url}/${action.id}`,
      authHeaders,
    );
    const { success } = response.data;
    if (success) {
      yield put(deleteTodoSuccess(action.id));
    }
  } catch (err) {
    yield put(deleteTodoError(err));
  }
}

export function* getComplete(action) {
  // select todo by id from Store
  const todo = yield select(makeSelectTodoById(action));
  try {
    const response = yield call(
      axios.put,
      `${url}/${action.id}`,
      { completed: !todo.complete },
      authHeaders,
    );
    const { data } = response.data;
    yield put(completeTodoSuccess(data._id));
  } catch (err) {
    yield put(completeTodoError(err));
  }
}

export function* getEdit(action) {
  try {
    const response = yield call(
      axios.put,
      `${url}/${action.id}`,
      { description: action.todo },
      authHeaders,
    );
    const { data } = response.data;
    yield put(editTodoSuccess(data._id, data.description));
  } catch (err) {
    yield put(editTodoError(err));
  }
}

export default function* todosData() {
  yield all([
    takeEvery(LOAD_TODOS_REQUEST, getTodos),
    takeEvery(ADD_TODO_REQUEST, getAdd),
    takeEvery(DELETE_TODO_REQUEST, getDelete),
    takeEvery(COMPLETE_TODO_REQUEST, getComplete),
    takeEvery(EDIT_TODO_REQUEST, getEdit),
  ]);
}
