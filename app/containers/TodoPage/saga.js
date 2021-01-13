import axios from "axios";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import {
  addTodoError,
  addTodoSuccess,
  completeTodoError,
  completeTodoSuccess,
  deleteTodoError,
  deleteTodoSuccess,
  loadTodosError,
  loadTodosSuccess,
} from "./actions";
import {
  ADD_TODO_REQUEST,
  COMPLETE_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  LOAD_TODOS_REQUEST,
} from "./constants";
import { makeSelectTodoById } from "./selectors";

const url = `https://api-nodejs-todolist.herokuapp.com/task`;
const authHeaders = {
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak",
  },
};

export function* getTodos() {
  // const todos = yield select(makeSelectTodoList());
  try {
    const response = yield call(axios.get, url, authHeaders);
    const data = response.data.data;
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
      authHeaders
    );
    const data = response.data.data;
    yield put(addTodoSuccess(data));
  } catch (err) {
    yield put(addTodoError(err));
  }
}

export function* getDelete(action) {
  try {
    const response = yield call(
      axios.delete,
      `${url}/${action._id}`,
      authHeaders
    );
    const success = response.data.success;
    if (success) {
      yield put(deleteTodoSuccess(action._id));
    }
  } catch (err) {
    yield put(deleteTodoError(err));
  }
}

export function* getComplete(action) {
  // select todo from Store by id
  const todo = yield select(makeSelectTodoById(action));
  try {
    const response = yield call(
      axios.put,
      `${url}/${action._id}`,
      { completed: !todo.complete },
      authHeaders
    );
    const data = response.data.data;
    yield put(completeTodoSuccess(data._id));
  } catch (err) {
    yield put(completeTodoError(err));
  }
}

export default function* todosData() {
  yield all([
    takeEvery(LOAD_TODOS_REQUEST, getTodos),
    takeEvery(ADD_TODO_REQUEST, getAdd),
    takeEvery(DELETE_TODO_REQUEST, getDelete),
    takeEvery(COMPLETE_TODO_REQUEST, getComplete),
  ]);
}
