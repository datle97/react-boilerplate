/* eslint-disable no-param-reassign */
import axios from 'axios';
import { useImmer } from 'use-immer';

const useCompleted = url => {
  const [completedTodo, setCompletedTodo] = useImmer({
    isLoading: null,
    error: false,
  });

  // eslint-disable-next-line consistent-return
  const fetchCompleted = async (id, completed) => {
    // loading
    setCompletedTodo(draft => {
      draft.isLoading = id;
      draft.error = false;
    });
    try {
      const response = await axios.put(
        url + id,
        { completed: !completed },
        {
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
          },
        },
      );
      // success
      setCompletedTodo(draft => {
        draft.isLoading = null;
      });
      return response.data;
    } catch (error) {
      // error
      setCompletedTodo(draft => {
        draft.isLoading = null;
        draft.error = error;
      });
    }
  };

  return { completedTodo, fetchCompleted };
};

export default useCompleted;
