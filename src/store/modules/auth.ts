import { Module, } from 'vuex';
import Cookies from 'js-cookie';

import { ISignInInput, ISignUpInput, IUser, } from '../../interfaces/user';
import { sign } from '../../api';
import { RootState } from '../index';

export interface AuthState {
    me: string | undefined;
    token: string | undefined;
}

export const AuthModule: Module<AuthState, RootState> = {
    state: {
        me: Cookies.get('me'),
        token: Cookies.get('token'),
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
            Cookies.set('me', JSON.stringify(user));
            Cookies.set('token', token);
        },
        SIGNOUT(state) {
            state.me = '';
            state.token = '';
            Cookies.remove('me');
            Cookies.remove('token');
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
