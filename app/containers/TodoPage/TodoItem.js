import React from "react";
import { CircularProgress, IconButton, Typography } from "@material-ui/core";
import CropFreeOutlinedIcon from "@material-ui/icons/CropFreeOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import styled from "styled-components";

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
  .completeProgress {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -24px;
    margin-left: -24px;
  }
  .deleteProgress {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -15px;
    margin-left: -15px;
  }
`;

const TodoItem = ({
  _id,
  completed,
  description,
  handleDelete,
  deleteLoading,
  handleComplete,
  completeLoading,
}) => {
  return (
    <Wrapper>
      <div className="wrapIcon">
        <IconButton onClick={() => handleComplete(_id)}>
          {!completed ? (
            <CropFreeOutlinedIcon color="primary" />
          ) : (
            <LibraryAddCheckIcon color="primary" />
          )}
        </IconButton>
        {completeLoading === _id && (
          <CircularProgress className="completeProgress" size={48} />
        )}
      </div>
      <Typography>{description}</Typography>
      <IconButton className="marginLeft" size="small">
        <EditIcon />
      </IconButton>
      <div className="wrapIcon">
        <IconButton
          size="small"
          onClick={() => {
            handleDelete(_id);
          }}
        >
          <DeleteOutlinedIcon />
        </IconButton>
        {deleteLoading === _id && (
          <CircularProgress className="deleteProgress" size={30} />
        )}
      </div>
    </Wrapper>
  );
};

TodoItem.propTypes = {
  _id: PropTypes.string,
  completed: PropTypes.bool,
  description: PropTypes.string,
  handleDelete: PropTypes.func,
  deleteLoading: PropTypes.string,
  handleComplete: PropTypes.func,
  completeLoading: PropTypes.string,
};

export default TodoItem;
