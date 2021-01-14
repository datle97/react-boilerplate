import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTodos = state => state.todos || initialState;

const makeSelectTodoById = state =>
  createSelector(
    selectTodos,
    todosState => {
      const index = todosState.todoList.findIndex(
        todo => todo._id === state.id,
      );
      return todosState.todoList[index];
    },
  );

//
const makeSelectLoading = () =>
  createSelector(
    selectTodos,
    todosState => todosState.loading,
  );

const makeSelectTodoList = () =>
  createSelector(
    selectTodos,
    todosState => todosState.todoList,
  );

const makeSelectError = () =>
  createSelector(
    selectTodos,
    todosState => todosState.error,
  );

// ////////////////////////////////
const makeSelectAddLoading = () =>
  createSelector(
    selectTodos,
    todosState => todosState.addLoading,
  );
const makeSelectAddError = () =>
  createSelector(
    selectTodos,
    todosState => todosState.addError,
  );

const makeSelectDeleteLoading = () =>
  createSelector(
    selectTodos,
    todosState => todosState.deleteLoading,
  );
const makeSelectDeleteError = () =>
  createSelector(
    selectTodos,
    todosState => todosState.deleteError,
  );

const makeSelectCompleteLoading = () =>
  createSelector(
    selectTodos,
    todosState => todosState.completeLoading,
  );
const makeSelectCompleteError = () =>
  createSelector(
    selectTodos,
    todosState => todosState.completeError,
  );

const makeSelectEditingTodo = () =>
  createSelector(
    selectTodos,
    todosState => todosState.editingTodo,
  );

const makeSelectEditLoading = () =>
  createSelector(
    selectTodos,
    todosState => todosState.editLoading,
  );
export {
  makeSelectLoading,
  makeSelectTodoList,
  makeSelectError,
  makeSelectDeleteLoading,
  makeSelectAddLoading,
  makeSelectAddError,
  makeSelectDeleteError,
  makeSelectCompleteLoading,
  makeSelectCompleteError,
  makeSelectTodoById,
  makeSelectEditingTodo,
  makeSelectEditLoading,
};
