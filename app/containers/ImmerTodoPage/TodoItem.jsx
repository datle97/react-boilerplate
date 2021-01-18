import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import CropFreeOutlinedIcon from '@material-ui/icons/CropFreeOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import TodoWrapper from './components/TodoWrapper';
import IconWrapper from './components/IconWrapper';
import CompleteCircularProgress from './components/CompleteCircularProgress';
import StyledCircularProgress from './components/StyledCircularProgress';
import StyledIconButton from './components/StyledIconButton';

const TodoItem = ({
  id,
  completed,
  description,
  handleDelete,
  deleteLoading,
  handleCompleted,
  completedLoading,
  handleSelect,
}) => (
  <TodoWrapper>
    <IconWrapper>
      <IconButton onClick={() => handleCompleted(id)}>
        {!completed ? (
          <CropFreeOutlinedIcon color="primary" />
        ) : (
          <LibraryAddCheckIcon color="primary" />
        )}
      </IconButton>
      {completedLoading === id && <CompleteCircularProgress size={48} />}
    </IconWrapper>
    <Typography>{description}</Typography>
    <StyledIconButton size="small" onClick={() => handleSelect(id)}>
      <EditIcon />
    </StyledIconButton>
    <IconWrapper>
      <IconButton size="small" onClick={() => handleDelete(id)}>
        <DeleteOutlinedIcon />
      </IconButton>
      {deleteLoading === id && <StyledCircularProgress size={30} />}
    </IconWrapper>
  </TodoWrapper>
);

TodoItem.propTypes = {
  id: PropTypes.string,
  completed: PropTypes.bool,
  description: PropTypes.string,
  handleDelete: PropTypes.func,
  deleteLoading: PropTypes.string,
  handleCompleted: PropTypes.func,
  completedLoading: PropTypes.string,
  handleSelect: PropTypes.func,
};

export default TodoItem;
