import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import CropFreeOutlinedIcon from '@material-ui/icons/CropFreeOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .marginLeft {
    margin-left: auto;
  }
  margin: 0 16px;
`;

const TodoItem = ({ isComplete, description }) => (
  <Wrapper>
    <IconButton>
      {!isComplete ? <CropFreeOutlinedIcon /> : <LibraryAddCheckIcon />}{' '}
    </IconButton>
    <Typography>{description}</Typography>
    <IconButton className="marginLeft" size="small">
      <EditIcon />
    </IconButton>
    <IconButton size="small">
      <DeleteOutlinedIcon />
    </IconButton>
  </Wrapper>
);

TodoItem.propTypes = {
  isComplete: PropTypes.bool,
  description: PropTypes.string,
};

export default TodoItem;
