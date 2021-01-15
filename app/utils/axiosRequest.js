import axios from 'axios';

const axiosRequest = (method, options = {}) =>
  axios({
    baseURL: 'https://api-nodejs-todolist.herokuapp.com/task/',
    method,
    ...options,
    headers: {
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
    },
  })
    .then(data => data)
    .catch(error => error);

export default axiosRequest;
