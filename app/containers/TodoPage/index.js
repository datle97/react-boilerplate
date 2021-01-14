import React, { useEffect } from 'react';
import { AppBar, CircularProgress, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectLoading,
  makeSelectTodoList,
  makeSelectError,
  makeSelectDeleteLoading,
  makeSelectAddLoading,
  makeSelectAddError,
  makeSelectDeleteError,
  makeSelectCompleteLoading,
  makeSelectCompleteError,
  makeSelectEditingTodo,
  makeSelectEditLoading,
  makeSelectEditError,
} from './selectors';
import TodoItem from './TodoItem';
import {
  addTodoRequest,
  completeTodoRequest,
  deleteTodoRequest,
  editTodoRequest,
  loadTodosRequest,
  selectTodo,
  unselectTodo,
} from './actions';
import EditingTodo from './EditingTodo';
import TodoListWrapper from './components/TodoListWrapper';
import AppWrapper from './components/AppWrapper';
import StyledToolbar from './components/StyledToolbar';
import ErrorTypography from './components/ErrorTypography';
import AddTodo from './AddTodo';

const key = 'todos';
const TodoPage = ({
  loading,
  todoList,
  error,
  fetchTodos,
  fetchDelete,
  fetchAdd,
  deleteLoading,
  addLoading,
  addError,
  deleteError,
  completeLoading,
  completeError,
  fetchComplete,
  fetchSelect,
  fetchUnselect,
  editingTodo,
  fetchEdit,
  editLoading,
  editError,
}) => {
  // ??????????????????????????????????????????????????????????????????????????????????????
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    fetchTodos();
  }, []);

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
        <AddTodo addLoading={addLoading} fetchAdd={fetchAdd} />
        {loading ? (
          <CircularProgress />
        ) : (
          todoList.map(todo =>
            editingTodo !== todo._id ? (
              <TodoItem
                key={todo._id}
                id={todo._id}
                completed={todo.completed}
                description={todo.description}
                handleDelete={fetchDelete}
                deleteLoading={deleteLoading}
                handleComplete={fetchComplete}
                completeLoading={completeLoading}
                handleSelect={fetchSelect}
              />
            ) : (
              <EditingTodo
                key={todo._id}
                id={todo._id}
                handleEdit={fetchEdit}
                editLoading={editLoading}
                handleUnselect={fetchUnselect}
                description={todo.description}
              />
            ),
          )
        )}
        {(error || addError || deleteError || completeError || editError) && (
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
  loading: makeSelectLoading(),
  error: makeSelectError(),
  addLoading: makeSelectAddLoading(),
  addError: makeSelectAddError(),
  deleteLoading: makeSelectDeleteLoading(),
  deleteError: makeSelectDeleteError(),
  completeLoading: makeSelectCompleteLoading(),
  completeError: makeSelectCompleteError(),
  editingTodo: makeSelectEditingTodo(),
  editLoading: makeSelectEditLoading(),
  editError: makeSelectEditError(),
});

const mapDispatchToProps = dispatch => ({
  fetchTodos: () => dispatch(loadTodosRequest()),
  fetchAdd: todo => dispatch(addTodoRequest(todo)),
  fetchDelete: id => dispatch(deleteTodoRequest(id)),
  fetchComplete: id => dispatch(completeTodoRequest(id)),
  fetchEdit: (id, todo) => dispatch(editTodoRequest(id, todo)),
  // select Todo
  fetchSelect: id => dispatch(selectTodo(id)),
  fetchUnselect: () => dispatch(unselectTodo()),
});

TodoPage.propTypes = {
  todoList: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  fetchTodos: PropTypes.func,
  fetchAdd: PropTypes.func,
  fetchDelete: PropTypes.func,
  fetchComplete: PropTypes.func,
  fetchSelect: PropTypes.func,
  fetchUnselect: PropTypes.func,
  fetchEdit: PropTypes.func,
  addLoading: PropTypes.bool,
  addError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  deleteLoading: PropTypes.string,
  deleteError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  completeLoading: PropTypes.string,
  completeError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  editingTodo: PropTypes.string,
  editLoading: PropTypes.string,
  editError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoPage);
