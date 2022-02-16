import axios from 'axios';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

import config from '../../config';

import sign from './sign';
import user from './user';
import card from './card';
import todo from './todo';
import comment from './comment';
import file from './file';
import tag from './tag';

export const authHeader = () => {
  const token = cookies.get('token');
  return { Authorization: 'Bearer ' + token, };
};

export const api = axios.create({
  baseURL: config.server.apiV1,
  headers: authHeader(),
});

export {
  sign,
  card,
  todo,
  user,
  comment,
  file,
  tag,
};
