/* eslint-disable no-param-reassign */
import axios from 'axios';
import { useState } from 'react';
import { useImmer } from 'use-immer';

const useAdd = url => {
  const [input, setInput] = useState('');
  const [addTodo, setAddTodo] = useImmer({
    isLoading: false,
    error: false,
  });

  // eslint-disable-next-line consistent-return
  const fetchAdd = async () => {
    // loading
    setAddTodo(draft => {
      draft.isLoading = true;
      draft.error = false;
    });
    try {
      const response = await axios.post(
        url,
        { description: input },
        {
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
          },
        },
      );
      // success
      setAddTodo(draft => {
        draft.isLoading = false;
      });
      return response.data.data;
    } catch (error) {
      // error
      setAddTodo(draft => {
        draft.isLoading = false;
        draft.error = error;
      });
    }
  };

  const handleChange = event => {
    setInput(event.target.value);
  };

  return { addTodo, input, setInput, handleChange, fetchAdd };
};

export default useAdd;
