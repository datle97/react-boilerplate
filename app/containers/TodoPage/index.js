import { AppBar, TextField, Toolbar, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
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
  .textField {
    margin: 24px 0;
  }
`;

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api-nodejs-todolist.herokuapp.com/task`,
        {
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
          },
        },
      );
      setTodoList(response.data.data);
    };
    fetchData();
  }, []);
  console.log(todoList);
  return (
    <Wrapper>
      <App>
        <AppBar position="static" variant="elevation">
          <Toolbar className="toolbar">
            <Typography variant="h5">React Todo List (x)</Typography>
          </Toolbar>
        </AppBar>
        <TextField
          className="textField"
          variant="outlined"
          placeholder="Add Task"
          size="small"
        />
        {todoList.length > 0 &&
          todoList.map(todo => (
            <TodoItem
              isComplete={todo.complete}
              description={todo.description}
            />
          ))}
      </App>
    </Wrapper>
  );
};

export default TodoPage;
