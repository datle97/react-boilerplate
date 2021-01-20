/* eslint-disable no-param-reassign */
import React from 'react';
import { AppBar, CircularProgress, Typography } from '@material-ui/core';
import TodoItem from './TodoItem';
import TodoListWrapper from './components/TodoListWrapper';
import AppWrapper from './components/AppWrapper';
import StyledToolbar from './components/StyledToolbar';
import AddTodo from './AddTodo';
import useTodo from './hooks/useTodo';
import EditingTodo from './EditingTodo';

const ImmerTodoPage = () => {
  const {
    todoList,
    addTodo,
    deleteTodo,
    completedTodo,
    selectTodo,
    unselectTodo,
    editTodo,
  } = useTodo('https://api-nodejs-todolist.herokuapp.com/task/');

  const errors = Object.keys(todoList.error).map(todo => todoList.error[todo]);
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
        <AddTodo addLoading={todoList.isLoading.addTodo} handleAdd={addTodo} />
        {todoList.isLoading.fetchTodo ? (
          <CircularProgress />
        ) : (
          todoList.data.map(todo =>
            todoList.isSelect !== todo._id ? (
              <TodoItem
                key={todo._id}
                id={todo._id}
                completed={todo.completed}
                description={todo.description}
                deleteLoading={todoList.isLoading.deleteTodo}
                completedLoading={todoList.isLoading.completedTodo}
                handleDelete={deleteTodo}
                handleCompleted={completedTodo}
                handleSelect={selectTodo}
              />
            ) : (
              <EditingTodo
                key={todo._id}
                id={todo._id}
                handleEdit={editTodo}
                editLoading={todoList.isLoading.editTodo}
                handleUnselect={unselectTodo}
                description={todo.description}
              />
            ),
          )
        )}
        {errors.map(
          error =>
            error && (
              // điều kiện error => key không trùng nhau.
              <Typography key={error} color="error">
                {error}
              </Typography>
            ),
        )}
      </AppWrapper>
    </TodoListWrapper>
  );
};

export default ImmerTodoPage;
