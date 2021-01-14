import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTodos = state => state.todos || initialState;

// SELECT TODOLIST
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

// SELECT ADD TODO
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

// SELECT DELETE TODO
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

// SELECT COMPLETE TODO
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

// SELECT EDITING TODO
const makeSelectEditingTodo = () =>
  createSelector(
    selectTodos,
    todosState => todosState.editingTodo,
  );

// SELECT EDIT TODO
const makeSelectEditLoading = () =>
  createSelector(
    selectTodos,
    todosState => todosState.editLoading,
  );
const makeSelectEditError = () =>
  createSelector(
    selectTodos,
    todosState => todosState.editError,
  );

// SELECT TODO BY ID
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
  makeSelectEditError,
};
