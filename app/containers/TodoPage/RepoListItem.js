/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';
import EditingTodo from './EditingTodo';

export function RepoListItem(props) {
  const {
    todo,
    isActive,
    fetchDelete,
    deleteTodo,
    fetchCompleted,
    completedTodo,
    fetchSelect,
    fetchEdit,
    editTodo,
    fetchUnselect,
  } = props;

  const content =
    isActive !== todo._id ? (
      <TodoItem
        id={todo._id}
        completed={todo.completed}
        description={todo.description}
        handleDelete={fetchDelete}
        deleteLoading={deleteTodo.isLoading}
        handleCompleted={fetchCompleted}
        completedLoading={completedTodo.isLoading}
        handleSelect={fetchSelect}
      />
    ) : (
      <EditingTodo
        id={todo._id}
        handleEdit={fetchEdit}
        editLoading={editTodo.isLoading}
        handleUnselect={fetchUnselect}
        description={todo.description}
      />
    );

  // Render the content into a list item
  return <div key={`repo-list-item-${todo._id}`}>{content}</div>;
}

RepoListItem.propTypes = {
  todo: PropTypes.any,
  isActive: PropTypes.any,
  fetchDelete: PropTypes.any,
  deleteTodo: PropTypes.any,
  fetchCompleted: PropTypes.any,
  completedTodo: PropTypes.any,
  fetchSelect: PropTypes.any,
  fetchEdit: PropTypes.any,
  editTodo: PropTypes.any,
  fetchUnselect: PropTypes.any,
};

export default RepoListItem;
