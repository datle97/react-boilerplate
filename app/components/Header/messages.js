/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  todolist: {
    id: `${scope}.todolist`,
    defaultMessage: 'Todolist',
  },
  immertodolist: {
    id: `${scope}.immertodolist`,
    defaultMessage: 'Immer Todolist',
  },
});
