/* eslint-disable no-param-reassign */
import axios from 'axios';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';

const initialState = {
  isLoading: false,
  data: [],
  error: false,
};

const useFetch = (url, options = {}) => {
  const [state, setState] = useImmer(initialState);
  useEffect(() => {
    const fetchData = async () => {
      // loading
      setState(draft => {
        draft.isLoading = true;
      });
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
          },
          ...options,
        });
        // success
        setState(draft => {
          draft.isLoading = false;
          draft.data = response.data.data;
        });
      } catch (error) {
        // error
        setState(draft => {
          draft.isLoading = false;
          draft.error = error;
        });
      }
    };
    fetchData();
  }, []);
  return { ...state };
};

export default useFetch;
