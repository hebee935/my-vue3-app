import { Module, } from 'vuex';

import { ITodo } from '../../interfaces/todo';
import { RootState } from '../index';
import { todo } from '../../api';

export interface TodoState {
    list: Array<ITodo>
}

export const TodoModule: Module<TodoState, RootState> = {
    state: {
        list: [],
    },
    getters: {
        getTodoList: state => {
            return state.list;
        },
    },
    mutations: {
        SET_TODOS(state, list) {
            state.list = list;
        },
        ADD_TODO(state, todo: ITodo) {
            state.list.push(todo);
        },
        UPDATE_TODO(state, todo: ITodo) {
            const idx = state.list.findIndex(c => c._id === todo._id);
            state.list[idx] = todo;
        },
        DELETE_TODO(state, id) {
            const idx = state.list.findIndex(c => c._id === id);
            state.list.splice(idx, 1);
        },
    },
    actions: {
        async getTodos({ commit, }) {
            const { success, data } = await todo.getTodoList();
            if (success) commit('SET_TODOS', data);
        },
        async addTodo({ commit, }, input) {
            const { success, data } = await todo.createTodo(input);
            if (success) commit('ADD_TODO', data);
        },
        async updateTodo({ commit, }, input) {
            const { success, data } = await todo.updateTodo(input._id, input);
            if (success) commit('UPDATE_TODO', data);
        },
        async deleteTodo({ commit, }, id) {
            const success = await todo.deleteTodo(id);
            if (success) commit('DELETE_TODO', id);
        }
    }
};