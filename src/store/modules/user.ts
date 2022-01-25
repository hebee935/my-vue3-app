import { Module, } from 'vuex';
import axios from 'axios';

import config from '../../../config';

import { IUser, } from '../../interfaces/user';
import { RootState } from '../index';

export interface UserState {
    list: Array<IUser>
}

export const UserModule: Module<UserState, RootState> = {
    state: {
        list: [],
    },
    getters: {
    },
    mutations: {
        GET_USERS(state, list) {
            state.list = list;
        },
        // DELETE_USER(state, id) {
        //     const idx = state.list.findIndex(c => c._id === id);
        //     state.list.splice(idx, 1);
        // },
    },
    actions: {
        getUsers({ commit }) {
            axios.get(`${config.server.apiV1}/user`)
                .then(res => {
                    commit('GET_USERS', res.data.data);
                }).catch(err => {
                    console.log(err);
                });
        },
        addUser({ commit }, input) {
            axios.post(`${config.server.apiV1}/user`, input)
                .then(res => {
                    commit('ADD_USER', res.data.data);
                }).catch(err => {
                    console.log(err);
                });
        },
        updateUser({ commit }, input) {
            axios.put(`${config.server.apiV1}/user/${input._id}`, input)
                .then(res => {
                    commit('UPDATE_USER', res.data.data);
                }).catch(err => {
                    console.log(err);
                });
        },
        deleteUser({ commit }, id) {
            axios.delete(`${config.server.apiV1}/user/${id}`)
                .then(_res => {
                    commit('DELETE_USER', id);
                }).catch(err => {
                    console.log(err);
                });
        }
      },
};