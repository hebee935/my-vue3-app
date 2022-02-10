import { Module, } from 'vuex';

import { IComment } from '../../interfaces/comment';
import { RootState } from '../index';
import { comment } from '../../api';

export interface CommentState {
    list: Array<IComment>;
    comment: IComment | null;
}

export const CommentModule: Module<CommentState, RootState> = {
  state: {
    list: [],
    comment: null,
  },
  getters: {
    getCommentList: state => {
      return state.list;
    },
    getCommentOne: state => {
      return state.comment;
    }
  },
  mutations: {
    SET_COMMENTS(state, list) {
      state.list = list;
    },
    SET_COMMENT(state, comment: IComment) {
      state.comment = comment;
    },
    ADD_COMMENT(state, comment: IComment) {
      state.list.push(comment);
    },
    UPDATE_COMMENT(state, comment: IComment) {
      const idx = state.list.findIndex(c => c._id === comment._id);
      state.list[idx] = comment;
    },
    DELETE_COMMENT(state, id) {
      const idx = state.list.findIndex(c => c._id === id);
      state.list.splice(idx, 1);
    },
    CLEAR_COMMENTS(state) {
      state.list = [];
    }
  },
  actions: {
    async setComments({ commit, }, cardid) {
      const { success, data } = await comment.getCommentList(cardid);
      if (success) commit('SET_COMMENTS', data);
    },
    async setCommentOne({ commit, state }, commentid) {
      const findComment = state.list.find(comment => comment._id === commentid);
      if (findComment) commit('SET_COMMENT', findComment);
      else {
        const { success, data } = await comment.getCommentOne(commentid);
        if (success) {
          commit('ADD_COMMENT', data);
          commit('SET_COMMENT', data);
        }
      }
    },
    async addComment({ commit, }, input) {
      const { success, data } = await comment.createComment(input);
      if (success) {
        commit('ADD_COMMENT', data);
        return data;
      }
    },
    async updateComment({ commit, }, input) {
      const { success, data } = await comment.updateComment(input._id, input);
      if (success) commit('UPDATE_COMMENT', data);
    },
    async deleteComment({ commit, }, id) {
      const success = await comment.deleteComment(id);
      if (success) commit('DELETE_COMMENT', id);
    }
  },
};
