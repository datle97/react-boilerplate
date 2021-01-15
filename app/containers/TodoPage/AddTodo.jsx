import { CircularProgress, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';

const AddTodo = ({ addLoading, fetchAdd }) => {
  const [newTodo, setNewTodo] = useState('');
  const handleChange = event => {
    setNewTodo(event.target.value);
  };
  const handleAdd = event => {
    event.preventDefault();
    fetchAdd(newTodo);
    setNewTodo('');
  };

  return (
    <Form onSubmit={handleAdd}>
      <TextField
        variant="outlined"
        placeholder="Add Task"
        size="small"
        value={newTodo}
        onChange={handleChange}
      />
      {addLoading && <CircularProgress />}
    </Form>
  );
};

AddTodo.propTypes = {
  addLoading: PropTypes.bool,
  fetchAdd: PropTypes.func,
};

export default AddTodo;
