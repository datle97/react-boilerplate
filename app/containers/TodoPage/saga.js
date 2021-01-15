import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import axiosRequest from '../../utils/axiosRequest';
import {
  addTodoDone,
  completedTodoDone,
  deleteTodoDone,
  editTodoDone,
  loadTodosDone,
} from './actions';
import {
  ADD_TODO_REQUEST,
  COMPLETED_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  EDIT_TODO_REQUEST,
  GET_TODOS_REQUEST,
} from './constants';
import { makeSelectTodoById } from './selectors';

export function* getTodos() {
  try {
    const response = yield call(axiosRequest, 'get');
    const { data } = response.data;
    yield put(loadTodosDone({ status: true, data }));
  } catch (error) {
    yield put(loadTodosDone({ status: false, error }));
  }
}

export function* getAdd(action) {
  try {
    const response = yield call(axiosRequest, 'post', {
      data: { description: action.payload.todo },
    });
    const { data } = response.data;
    yield put(addTodoDone({ status: true, data }));
  } catch (error) {
    yield put(addTodoDone({ status: false, error }));
  }
}

export function* getDelete(action) {
  const { id } = action.payload;
  try {
    const response = yield call(axiosRequest, 'delete', { url: id });
    const { success } = response.data;
    if (success) {
      yield put(deleteTodoDone({ status: true, id }));
    }
  } catch (error) {
    yield put(deleteTodoDone({ status: false, error }));
  }
}

export function* getCompleted(action) {
  const { id } = action.payload;
  // select todo by id from Store
  const todo = yield select(makeSelectTodoById(id));
  try {
    const response = yield call(axiosRequest, 'put', {
      url: id,
      data: { completed: !todo.completed },
    });
    const { data } = response.data;
    yield put(completedTodoDone({ status: true, id, data: data.completed }));
  } catch (error) {
    yield put(completedTodoDone({ status: false, error }));
  }
}

export function* getEdit(action) {
  const { id, todo } = action.payload;
  try {
    const response = yield call(axiosRequest, 'put', {
      url: id,
      data: { description: todo },
    });
    const { data } = response.data;
    yield put(
      editTodoDone({ status: true, id: data._id, data: data.description }),
    );
  } catch (error) {
    yield put(editTodoDone({ status: false, error }));
  }
}

export default function* todosData() {
  yield all([
    takeEvery(GET_TODOS_REQUEST, getTodos),
    takeEvery(ADD_TODO_REQUEST, getAdd),
    takeEvery(DELETE_TODO_REQUEST, getDelete),
    takeEvery(COMPLETED_TODO_REQUEST, getCompleted),
    takeEvery(EDIT_TODO_REQUEST, getEdit),
  ]);
}
