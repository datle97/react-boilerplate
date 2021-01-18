/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { AppBar, CircularProgress, Typography } from '@material-ui/core';
import { useImmer } from 'use-immer';
import axios from 'axios';
import TodoItem from './TodoItem';
import EditingTodo from './EditingTodo';
import TodoListWrapper from './components/TodoListWrapper';
import AppWrapper from './components/AppWrapper';
import StyledToolbar from './components/StyledToolbar';
import ErrorTypography from './components/ErrorTypography';
import AddTodo from './AddTodo';
import useFetch from './hooks/useFetch';
import useAdd from './hooks/useAdd';

const ImmerTodoPage = () => {
  const todoList = useFetch('https://api-nodejs-todolist.herokuapp.com/task/');
  const [addTodo, fetchData] = useAdd(
    todoList,
    'https://api-nodejs-todolist.herokuapp.com/task/',
    { data: { description: 'AAAA' } },
  );

  return (
    <TodoListWrapper>
      <AppWrapper>
        <AppBar position="static" variant="elevation">
          <StyledToolbar>
            <Typography variant="h5">
              React Todo List ({todoList.data.length})
            </Typography>
          </StyledToolbar>
        </AppBar>
        <AddTodo
        // addLoading={addTodo.isLoading}
        // fetchAdd={() => console.log(addTodo)}
        />
        {todoList.isLoading ? (
          <CircularProgress />
        ) : (
          todoList.data.map(
            todo => (
              // isActive !== todo._id ? (
              <TodoItem
                key={todo._id}
                id={todo._id}
                completed={todo.completed}
                description={todo.description}
                // handleDelete={fetchDelete}
                // deleteLoading={deleteTodo.isLoading}
                // handleCompleted={fetchCompleted}
                // completedLoading={completedTodo.isLoading}
                // handleSelect={fetchSelect}
              />
            ),
            // ) : (
            //   <EditingTodo
            //     key={todo._id}
            //     id={todo._id}
            //     handleEdit={fetchEdit}
            //     editLoading={editTodo.isLoading}
            //     handleUnselect={fetchUnselect}
            //     description={todo.description}
            //   />
            // ),
          )
        )}
        {/* {(getTodos.error ||
          addTodo.error ||
          deleteTodo.error ||
          completedTodo.error ||
          editTodo.error) && (
          <ErrorTypography color="error">
            An error occurred, please try again later.
          </ErrorTypography>
        )}  */}
      </AppWrapper>
    </TodoListWrapper>
  );
};

// ImmerTodoPage.propTypes = {
//   todoList: PropTypes.array,
//   getTodos: PropTypes.object,
//   fetchTodos: PropTypes.func,
//   fetchAdd: PropTypes.func,
//   fetchDelete: PropTypes.func,
//   fetchCompleted: PropTypes.func,
//   fetchSelect: PropTypes.func,
//   fetchUnselect: PropTypes.func,
//   fetchEdit: PropTypes.func,
//   addTodo: PropTypes.object,
//   deleteTodo: PropTypes.object,
//   completedTodo: PropTypes.object,
//   editTodo: PropTypes.object,
//   isActive: PropTypes.string,
// };

export default ImmerTodoPage;
