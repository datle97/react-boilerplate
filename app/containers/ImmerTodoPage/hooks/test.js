/* eslint-disable no-param-reassign */
import axios from 'axios';
import { useImmer } from 'use-immer';

const useCRUD = (url, method) => {
  const [state, setState] = useImmer({
    isLoading: null,
    error: false,
  });

  // eslint-disable-next-line consistent-return
  const fetchData = async (id = '', options = {}) => {
    // loading
    setState(draft => {
      draft.isLoading = id || true;
      draft.error = false;
    });
    try {
      const { data } = await axios({
        url: url + id,
        method,
        ...options,
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
        },
      });
      console.log(data);
      // success
      if (data.success) {
        setState(draft => {
          draft.isLoading = null;
        });
        return data.data;
      }
    } catch (error) {
      // error
      setState(draft => {
        draft.isLoading = null;
        draft.error = error;
      });
    }
  };

  return [state, fetchData];
};

export default useCRUD;
