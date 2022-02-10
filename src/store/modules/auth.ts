import { Module, } from 'vuex';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

import { ISignInInput, ISignUpInput, IUser, } from '../../interfaces/user';
import { sign } from '../../api';
import { RootState } from '../index';

export interface AuthState {
  me: string | undefined;
  token: string | undefined;
}

export const AuthModule: Module<AuthState, RootState> = {
  state: {
    me: cookies.get('me'),
    token: cookies.get('token'),
  },
  getters: {
    getMyInfo: state => {
      return state.me;
    },
    getToken: state => {
      return state.token;
    },
  },
  mutations: {
    SET_USER(state, { user, token }) {
      state.me = user;
      state.token = token;
      cookies.set('me', user);
      cookies.set('token', token);
    },
    SIGNOUT(state) {
      state.me = '';
      state.token = '';
      cookies.remove('me');
      cookies.remove('token');
    }
  },
  actions: {
    async signin({ commit }, input: ISignInInput) {
      const { success, data } = await sign.signin(input);
      if (success) commit('SET_USER', data);
    },
    async signup({ commit }, input: ISignUpInput) {
      const { success, data } = await sign.signup(input);
      if (success) commit('SET_USER', data);
    },
    async checkUid(_, uid: string): Promise<boolean> {
      const { success, } = await sign.checkUid(uid);
      return success;
    },
  },
};
