/* eslint-disable no-param-reassign */
import { useEffect, useCallback } from 'react';
import { useImmer } from 'use-immer';
import axiosRequest from './axiosRequest';

const initialState = {
  data: [],
  isLoading: {
    fetchTodo: false,
    addTodo: false,
    deleteTodo: null,
    completedTodo: null,
    editTodo: null,
  },
  error: {
    fetchTodo: false,
    addTodo: false,
    deleteTodo: null,
    completedTodo: null,
    editTodo: null,
  },
  isSelect: null,
};

const useTodo = url => {
  const [todoList, setTodoList] = useImmer(initialState);

  const fetchData = useCallback(async () => {
    // loading
    setTodoList(draft => {
      draft.isLoading.fetchTodo = true;
      draft.error.fetchTodo = false;
    });

    try {
      const { data } = await axiosRequest(url, 'get');
      // success
      setTodoList(draft => {
        draft.isLoading.fetchTodo = false;
        draft.data = data.data;
      });
    } catch (error) {
      // error
      setTodoList(draft => {
        draft.isLoading.fetchTodo = false;
        draft.error.fetchTodo = error.message;
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = async description => {
    setTodoList(draft => {
      draft.isLoading.addTodo = true;
      draft.error.addTodo = false;
    });
    try {
      const { data } = await axiosRequest(url, 'post', {
        data: { description },
      });
      // success
      setTodoList(draft => {
        draft.isLoading.addTodo = false;
        draft.data.push(data.data);
      });
    } catch (error) {
      setTodoList(draft => {
        draft.isLoading.addTodo = false;
        draft.error.addTodo = error.message;
      });
    }
  };

  const deleteTodo = async id => {
    setTodoList(draft => {
      draft.isLoading.deleteTodo = id;
      draft.error.deleteTodo = false;
    });
    try {
      const { data } = await axiosRequest(url + id, 'delete');
      // success
      if (data.success) {
        setTodoList(draft => {
          draft.isLoading.deleteTodo = null;

          const index = draft.data.findIndex(todo => todo._id === id);
          draft.data.splice(index, 1);
        });
      }
    } catch (error) {
      setTodoList(draft => {
        draft.isLoading.deleteTodo = null;
        draft.error.deleteTodo = error.message;
      });
    }
  };

  const completedTodo = async (id, completed) => {
    setTodoList(draft => {
      draft.isLoading.completedTodo = id;
      draft.error.completedTodo = false;
    });
    try {
      const { data } = await axiosRequest(url + id, 'put', {
        data: {
          completed: !completed,
        },
      });
      // success
      setTodoList(draft => {
        draft.isLoading.completedTodo = null;

        const index = draft.data.findIndex(todo => todo._id === id);
        draft.data[index].completed = data.data.completed;
      });
    } catch (error) {
      setTodoList(draft => {
        draft.isLoading.completedTodo = null;
        draft.error.completedTodo = error.message;
      });
    }
  };

  const editTodo = async (id, description) => {
    setTodoList(draft => {
      draft.isLoading.editTodo = id;
      draft.error.editTodo = false;
    });
    try {
      const { data } = await axiosRequest(url + id, 'put', {
        data: {
          description,
        },
      });
      // success
      setTodoList(draft => {
        draft.isLoading.editTodo = null;

        const index = draft.data.findIndex(todo => todo._id === id);
        draft.data[index].description = data.data.description;
      });
      unselectTodo();
    } catch (error) {
      setTodoList(draft => {
        draft.isLoading.editTodo = null;
        draft.error.editTodo = error.message;
      });
      unselectTodo();
    }
  };

  const selectTodo = id => {
    setTodoList(draft => {
      draft.isSelect = id;
    });
  };
  const unselectTodo = () => {
    setTodoList(draft => {
      draft.isSelect = null;
    });
  };

  return {
    todoList,
    addTodo,
    deleteTodo,
    completedTodo,
    selectTodo,
    unselectTodo,
    editTodo,
  };
};

export default useTodo;
