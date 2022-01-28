import axios from 'axios';
import Cookies from 'js-cookie';

import config from '../../config';

import sign from './sign';
import user from './user';
import card from './card';
import todo from './todo';

export const authHeader = () => {
    const token = Cookies.get('token');
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
};
