import { Module, } from 'vuex';

import { IFile } from '../../interfaces/file';
import { RootState } from '../index';
import { file } from '../../api';

export interface FileState {
    list: Array<IFile>;
    file: IFile | null;
}

export const FileModule: Module<FileState, RootState> = {
  state: {
    list: [],
    file: null,
  },
  getters: {
    getFileList: state => {
      return state.list;
    },
    getFileOne: state => {
      return state.file;
    }
  },
  mutations: {
    SET_FILES(state, list) {
      state.list = list;
    },
    SET_FILE(state, file: IFile) {
      state.file = file;
    },
    ADD_FILE(state, file: IFile) {
      state.list.push(file);
    },
    ADD_FILES(state, files: [IFile]) {
      state.list = [...state.list, ...files];
    },
    UPDATE_FILE(state, file: IFile) {
      const idx = state.list.findIndex(c => c._id === file._id);
      state.list[idx] = file;
    },
    DELETE_FILE(state, id) {
      const idx = state.list.findIndex(c => c._id === id);
      state.list.splice(idx, 1);
    },
    CLEAR_FILE(state) {
      state.file = null;
    },
  },
  actions: {
    async setFiles({ commit, }) {
      const { success, data } = await file.getFileList();
      if (success) commit('SET_FILES', data);
    },
    async setFileOne({ commit, state }, fileid) {
      const findFile = state.list.find(file => file._id === fileid);
      if (findFile) commit('SET_FILE', findFile);
      else {
        const { success, data } = await file.getFileOne(fileid);
        if (success) {
          commit('ADD_FILE', data);
          commit('SET_FILE', data);
        }
      }
    },
    async addFile({ commit, }, input) {
      const { success, data } = await file.uploadFile(input);
      if (success) {
        commit('ADD_FILES', data);
        return data;
      }
    },
    async getFileObject(_, fileid) {
      const data = await file.getFileObject(fileid);
      return data;
    },
    async updateFile({ commit, }, input) {
        const { success, data } = await file.updateFile(input._id, input);
        if (success) commit('UPDATE_FILE', data);
    },
    async deleteFile({ commit, }, id) {
      const success = await file.deleteFile(id);
      if (success) commit('DELETE_FILE', id);
    }
  },
};
