import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import TodoWrapper from './components/TodoWrapper';
import StyledInputBase from './components/StyledInputBase';
import IconWrapper from './components/IconWrapper';
import StyledIconButton from './components/StyledIconButton';
import StyledCircularProgress from './components/StyledCircularProgress';

const EditingTodo = ({
  id,
  handleEdit,
  editLoading,
  handleUnselect,
  description,
}) => {
  const [value, setValue] = useState(description);

  const handleSelectValue = event => {
    setValue(event.target.value);
  };
  return (
    <TodoWrapper>
      <StyledInputBase
        value={value}
        onChange={handleSelectValue}
        autoFocus
        onFocus={event => {
          event.target.select();
        }}
        fullWidth
      />
      <IconWrapper>
        <StyledIconButton size="small" onClick={() => handleEdit(id, value)}>
          <CheckIcon />
        </StyledIconButton>
        {editLoading === id && <StyledCircularProgress size={30} />}
      </IconWrapper>
      <IconButton size="small" onClick={() => handleUnselect()}>
        <CloseIcon />
      </IconButton>
    </TodoWrapper>
  );
};

EditingTodo.propTypes = {
  id: PropTypes.string,
  handleUnselect: PropTypes.func,
  handleEdit: PropTypes.func,
  editLoading: PropTypes.string,
  description: PropTypes.string,
};

export default EditingTodo;
