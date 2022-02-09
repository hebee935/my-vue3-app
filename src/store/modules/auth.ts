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
      return state.me && state.me !== 'undefined' ? JSON.parse(state.me) : null;
    },
    getToken: state => {
      return state.token;
    },
  },
  mutations: {
    SET_USER(state, { user, token }) {
      state.me = JSON.stringify(user);
      state.token = token;
      cookies.set('me', JSON.stringify(user));
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
    async signin({ commit }, input: ISignInInput): Promise<boolean> {
      const { success, data } = await sign.signin(input);
      if (success) commit('SET_USER', data);
      return success;
    },
    async signup({ commit }, input: ISignUpInput): Promise<boolean> {
      const { success, data } = await sign.signup(input);
      if (success) {
          commit('SET_USER', data);
      }
      return success;
    },
    async checkUid(_, uid: string): Promise<boolean> {
      const { success, } = await sign.checkUid(uid);
      return success;
    },
  },
};
