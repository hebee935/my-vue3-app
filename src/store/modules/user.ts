import { Module, } from 'vuex';

import { IUser, } from '../../interfaces/user';
import { RootState } from '../index';
import { user } from '../../api';

export interface UserState {
  list: Array<IUser>;
  user: IUser | null;
}

export const UserModule: Module < UserState, RootState > = {
  state: {
    list: [],
    user: null,
  },
  getters: {
    getUserOne(state) {
      return state.user;
    }
  },
  mutations: {
    SET_USERS(state, list) {
      state.list = list;
    },
    SET_USER(state, user: IUser) {
      state.user = user;
    },
    ADD_USER(state, user) {
      state.list.push(user);
    },
    // DELETE_USER(state, id) {
    //     const idx = state.list.findIndex(c => c._id === id);
    //     state.list.splice(idx, 1);
    // },
  },
  actions: {
    setUsers({ commit, }) {
      user.getUserList().then(({ success, data }) => {
        if (success) commit('SET_USERS', data);
      });
    },
    async setUserOne({ commit, state }, userid) {
      const findUser = state.list.find(user => user._id === userid);
      if (findUser) commit('SET_USER', findUser);
      else {
        const { success, data } = await user.getUserOne(userid);
        if (success) {
          commit('ADD_USER', data);
          commit('SET_USER', data);
        }
      }
    },
    // updateUser({
    //   commit
    // }, input) {
    //   axios.put(`${config.server.apiV1}/user/${input._id}`, input)
    //     .then(res => {
    //       commit('UPDATE_USER', res.data.data);
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // },
    // deleteUser({
    //   commit
    // }, id) {
    //   axios.delete(`${config.server.apiV1}/user/${id}`)
    //     .then(_res => {
    //       commit('DELETE_USER', id);
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // }
  },
};
