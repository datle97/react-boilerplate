import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTodos = state => state.todos || initialState;

// SELECT TODOLIST
const makeSelectTodoList = () =>
  createSelector(
    selectTodos,
    todosState => todosState.todoList,
  );

// SELECT GET TODOS
const makeSelectGetTodos = () =>
  createSelector(
    selectTodos,
    todosState => todosState.getTodos,
  );

// SELECT ADD TODO
const makeSelectAddTodo = () =>
  createSelector(
    selectTodos,
    todosState => todosState.addTodo,
  );

// SELECT DELETE TODO
const makeSelectDeleteTodo = () =>
  createSelector(
    selectTodos,
    todosState => todosState.deleteTodo,
  );

// SELECT COMPLETED TODO
const makeSelectCompletedTodo = () =>
  createSelector(
    selectTodos,
    todosState => todosState.completedTodo,
  );

// SELECT ACTIVE TODO
const makeSelectIsActive = () =>
  createSelector(
    selectTodos,
    todosState => todosState.isActive,
  );

// SELECT EDIT TODO
const makeSelectEditTodo = () =>
  createSelector(
    selectTodos,
    todosState => todosState.editTodo,
  );

// SELECT TODO BY ID
const makeSelectTodoById = id =>
  createSelector(
    selectTodos,
    todosState => {
      const index = todosState.todoList.findIndex(todo => todo._id === id);
      return todosState.todoList[index];
    },
  );

export {
  makeSelectTodoList,
  makeSelectGetTodos,
  makeSelectAddTodo,
  makeSelectDeleteTodo,
  makeSelectCompletedTodo,
  makeSelectTodoById,
  makeSelectIsActive,
  makeSelectEditTodo,
};
