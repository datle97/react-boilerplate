import { CircularProgress, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';

const AddTodo = ({ addLoading, handleAdd }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleAdd(value);
    setValue('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        placeholder="Add Task"
        size="small"
        value={value}
        onChange={handleChange}
      />
      {addLoading && <CircularProgress />}
    </Form>
  );
};

AddTodo.propTypes = {
  addLoading: PropTypes.bool,
  handleAdd: PropTypes.func,
};

export default AddTodo;
