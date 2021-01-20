/* eslint-disable no-param-reassign */
import axios from 'axios';
import { useImmer } from 'use-immer';

const useDelete = url => {
  const [deleteTodo, setDeleteTodo] = useImmer({
    isLoading: null,
    error: false,
  });

  // eslint-disable-next-line consistent-return
  const fetchDelete = async id => {
    // loading
    setDeleteTodo(draft => {
      draft.isLoading = id;
      draft.error = false;
    });
    try {
      const response = await axios.delete(url + id, {
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
        },
      });
      // success
      setDeleteTodo(draft => {
        draft.isLoading = null;
      });
      return response.data.success;
    } catch (error) {
      // error
      setDeleteTodo(draft => {
        draft.isLoading = null;
        draft.error = error;
      });
    }
  };

  return { deleteTodo, fetchDelete };
};

export default useDelete;
