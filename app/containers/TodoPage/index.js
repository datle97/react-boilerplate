import React, { useEffect, useState } from 'react';
import {
  AppBar,
  CircularProgress,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const App = styled.div`
  width: auto;
  text-align: center;
  background-color: #f5f5f5;
  .toolbar {
    min-width: 400px;
    padding: 24px 0;
    justify-content: center;
  }
  .form {
    margin: 24px 0;
    & > div {
      margin-left: 16px;
    }
  }
  .circularProgress {
    display: flex;
    justify-content: center;
    padding-bottom: 24px;
  }
  .error {
    margin: 16px 0;
  }
`;

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
}) => {
  // ??????????????????????????????????????????????????????????????????????????????????????
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [value, setValue] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    fetchAdd(value);
    setValue('');
  };

  return (
    <Wrapper>
      <App>
        <AppBar position="static" variant="elevation">
          <Toolbar className="toolbar">
            <Typography variant="h5">
              React Todo List ({todoList.length})
            </Typography>
          </Toolbar>
        </AppBar>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            placeholder="Add Task"
            size="small"
            value={value}
            onChange={handleChange}
          />
          {addLoading && <CircularProgress />}
        </form>
        {loading ? (
          <div className="circularProgress">
            <CircularProgress />
          </div>
        ) : (
          todoList.map(todo => (
            <TodoItem
              key={todo._id}
              id={todo._id}
              completed={todo.completed}
              description={todo.description}
              handleDelete={fetchDelete}
              deleteLoading={deleteLoading}
              handleComplete={fetchComplete}
              completeLoading={completeLoading}
              // handleSelect => toggle
              handleSelect={fetchSelect}
              handleUnselect={fetchUnselect}
              editingTodo={editingTodo}
              handleEdit={fetchEdit}
              editLoading={editLoading}
            />
          ))
        )}
        {(error || addError || deleteError || completeError) && (
          <Typography className="error" color="error">
            An error occurred, please try again later.
          </Typography>
        )}
      </App>
    </Wrapper>
  );
};

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
});

const mapDispatchToProps = dispatch => ({
  fetchTodos: () => dispatch(loadTodosRequest()),
  fetchAdd: todo => dispatch(addTodoRequest(todo)),
  fetchDelete: id => dispatch(deleteTodoRequest(id)),
  fetchComplete: id => dispatch(completeTodoRequest(id)),
  // select Todo
  fetchSelect: id => dispatch(selectTodo(id)),
  fetchUnselect: () => dispatch(unselectTodo()),
  // edit Todo
  fetchEdit: (id, todo) => dispatch(editTodoRequest(id, todo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoPage);
