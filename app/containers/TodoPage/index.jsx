import React, { useEffect } from 'react';
import { AppBar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import ReposList from './ReposList';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectTodoList,
  makeSelectDeleteTodo,
  makeSelectIsActive,
  makeSelectGetTodos,
  makeSelectAddTodo,
  makeSelectCompletedTodo,
  makeSelectEditTodo,
} from './selectors';
import {
  addTodoRequest,
  completedTodoRequest,
  deleteTodoRequest,
  editTodoRequest,
  loadTodosRequest,
  selectTodo,
  unselectTodo,
} from './actions';
import TodoListWrapper from './components/TodoListWrapper';
import AppWrapper from './components/AppWrapper';
import StyledToolbar from './components/StyledToolbar';
import ErrorTypography from './components/ErrorTypography';
import AddTodo from './AddTodo';

const key = 'todos';
const TodoPage = ({
  todoList,
  getTodos,
  fetchTodos,
  fetchDelete,
  fetchAdd,
  addTodo,
  deleteTodo,
  completedTodo,
  fetchCompleted,
  fetchSelect,
  fetchUnselect,
  isActive,
  fetchEdit,
  editTodo,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    fetchTodos();
  }, []);

  const reposListProps = {
    loading: getTodos.isLoading,
    error: getTodos.error,
    repos: todoList,
    isActive,
    fetchDelete,
    deleteTodo,
    fetchCompleted,
    completedTodo,
    fetchSelect,
    fetchEdit,
    editTodo,
    fetchUnselect,
  };
  return (
    <TodoListWrapper>
      <AppWrapper>
        <AppBar position="static" variant="elevation">
          <StyledToolbar>
            <Typography variant="h5">
              React Todo List ({todoList.length})
            </Typography>
          </StyledToolbar>
        </AppBar>
        <AddTodo addLoading={addTodo.isLoading} fetchAdd={fetchAdd} />

        <ReposList {...reposListProps} />
        {(getTodos.error ||
          addTodo.error ||
          deleteTodo.error ||
          completedTodo.error ||
          editTodo.error) && (
          <ErrorTypography color="error">
            An error occurred, please try again later.
          </ErrorTypography>
        )}
      </AppWrapper>
    </TodoListWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  todoList: makeSelectTodoList(),
  getTodos: makeSelectGetTodos(),
  addTodo: makeSelectAddTodo(),
  deleteTodo: makeSelectDeleteTodo(),
  completedTodo: makeSelectCompletedTodo(),
  isActive: makeSelectIsActive(),
  editTodo: makeSelectEditTodo(),
});

const mapDispatchToProps = dispatch => ({
  fetchTodos: () => dispatch(loadTodosRequest()),
  fetchAdd: todo => dispatch(addTodoRequest({ todo })),
  fetchDelete: id => dispatch(deleteTodoRequest({ id })),
  fetchCompleted: id => dispatch(completedTodoRequest({ id })),
  fetchEdit: (id, todo) => dispatch(editTodoRequest({ id, todo })),
  // select Todo
  fetchSelect: id => dispatch(selectTodo({ id })),
  fetchUnselect: () => dispatch(unselectTodo()),
});

TodoPage.propTypes = {
  todoList: PropTypes.array,
  getTodos: PropTypes.object,
  fetchTodos: PropTypes.func,
  fetchAdd: PropTypes.func,
  fetchDelete: PropTypes.func,
  fetchCompleted: PropTypes.func,
  fetchSelect: PropTypes.func,
  fetchUnselect: PropTypes.func,
  fetchEdit: PropTypes.func,
  addTodo: PropTypes.object,
  deleteTodo: PropTypes.object,
  completedTodo: PropTypes.object,
  editTodo: PropTypes.object,
  isActive: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoPage);
