import React from 'react';
import PropTypes from 'prop-types';
import RepoListItem from './RepoListItem';

function ReposList({
  loading,
  error,
  repos,
  isActive,
  fetchDelete,
  deleteTodo,
  fetchCompleted,
  completedTodo,
  fetchSelect,
  fetchEdit,
  editTodo,
  fetchUnselect,
}) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>Something went wrong, please try again!</p>;
  }

  if (repos.length > 0) {
    return repos.map(todo => (
      <RepoListItem
        key={todo._id}
        todo={todo}
        isActive={isActive}
        fetchDelete={fetchDelete}
        deleteTodo={deleteTodo}
        fetchCompleted={fetchCompleted}
        completedTodo={completedTodo}
        fetchSelect={fetchSelect}
        fetchEdit={fetchEdit}
        editTodo={editTodo}
        fetchUnselect={fetchUnselect}
      />
    ));
  }

  return null;
}

ReposList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  repos: PropTypes.any,
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

export default ReposList;
