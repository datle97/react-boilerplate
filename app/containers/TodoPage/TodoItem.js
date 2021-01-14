import React, { useState } from 'react';
import {
  CircularProgress,
  IconButton,
  InputBase,
  Typography,
} from '@material-ui/core';
import CropFreeOutlinedIcon from '@material-ui/icons/CropFreeOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .marginLeft {
    margin-left: auto;
  }
  margin: 0 16px;
  .wrapIcon {
    position: relative;
  }
`;

const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -15px;
  margin-left: -15px;
`;

const CompleteCircularProgress = styled(StyledCircularProgress)`
  margin-top: -24px;
  margin-left: -24px;
`;

const TodoItem = ({
  id,
  completed,
  description,
  handleDelete,
  deleteLoading,
  handleComplete,
  completeLoading,
  handleSelect,
  handleUnselect,
  editingTodo,
  handleEdit,
  editLoading,
}) => {
  const [selectValue, setSelectValue] = useState(description);

  const handleSelectValue = event => {
    setSelectValue(event.target.value);
  };
  return (
    <Wrapper>
      {editingTodo !== id ? (
        <>
          <div className="wrapIcon">
            <IconButton onClick={() => handleComplete(id)}>
              {!completed ? (
                <CropFreeOutlinedIcon color="primary" />
              ) : (
                <LibraryAddCheckIcon color="primary" />
              )}
            </IconButton>
            {completeLoading === id && <CompleteCircularProgress size={48} />}
          </div>
          <Typography>{description}</Typography>
          <IconButton
            className="marginLeft"
            size="small"
            onClick={() => handleSelect(id)}
          >
            <EditIcon />
          </IconButton>
          <div className="wrapIcon">
            <IconButton size="small" onClick={() => handleDelete(id)}>
              <DeleteOutlinedIcon />
            </IconButton>
            {deleteLoading === id && <StyledCircularProgress size={30} />}
          </div>
        </>
      ) : (
        <>
          <div className="wrapIcon">
            <IconButton onClick={() => handleComplete(id)}>
              {!completed ? (
                <CropFreeOutlinedIcon color="primary" />
              ) : (
                <LibraryAddCheckIcon color="primary" />
              )}
            </IconButton>
            {completeLoading === id && <StyledCircularProgress size={30} />}
          </div>
          <InputBase
            value={selectValue}
            onChange={handleSelectValue}
            autoFocus
            onFocus={event => {
              event.target.select();
            }}
            fullWidth
            // onChange={handleChange}
          />
          <div className="wrapIcon">
            <IconButton
              className="marginLeft"
              size="small"
              onClick={() => handleEdit(id, selectValue)}
            >
              <CheckIcon />
            </IconButton>
            {editLoading === id && <StyledCircularProgress size={30} />}
          </div>
          <IconButton size="small" onClick={() => handleUnselect()}>
            <CloseIcon />
          </IconButton>
        </>
      )}
    </Wrapper>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string,
  completed: PropTypes.bool,
  description: PropTypes.string,
  handleDelete: PropTypes.func,
  deleteLoading: PropTypes.string,
  handleComplete: PropTypes.func,
  completeLoading: PropTypes.string,
  handleSelect: PropTypes.func,
  editingTodo: PropTypes.string,
  handleUnselect: PropTypes.func,
  handleEdit: PropTypes.func,
  editLoading: PropTypes.string,
};

export default TodoItem;
