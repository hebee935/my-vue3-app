import { Module, } from 'vuex';

import { ITag } from '../../interfaces/tag';
import { RootState } from '../index';
import { tag } from '../../api';

export interface TagState {
  list: Array<ITag>
}

export const TagModule: Module<TagState, RootState> = {
  state: {
    list: [],
  },
  getters: {
    getTagList: state => {
      return state.list;
    },
  },
  mutations: {
    SET_TAGS(state, list) {
      state.list = list;
    },
    ADD_TAG(state, tag: ITag) {
      state.list.push(tag);
    },
    UPDATE_TAG(state, tag: ITag) {
      const idx = state.list.findIndex(c => c._id === tag._id);
      state.list[idx] = tag;
    },
    DELETE_TAG(state, id) {
      const idx = state.list.findIndex(c => c._id === id);
      state.list.splice(idx, 1);
    },
    CLEAR_TAGS(state) {
      state.list = [];
    }
  },
  actions: {
    async getTags({ commit, }, opt: any) {
      const { success, data } = await tag.getTagList(opt);
      if (success) commit('SET_TAGS', data);
    },
    async addTag(_, input) {
      const { success, data } = await tag.createTag(input);
      // if (success) commit('ADD_TAG', data);
    },
    async updateTag({ commit, }, input) {
      const { success, data } = await tag.updateTag(input._id, input);
      if (success) commit('UPDATE_TAG', data);
    },
    async deleteTag({ commit, }, id) {
      const success = await tag.deleteTag(id);
      if (success) commit('DELETE_TAG', id);
    }
  }
};
