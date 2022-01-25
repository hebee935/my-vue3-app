import { Module, } from 'vuex';

import { ICard } from '../../interfaces/card';
import { RootState } from '../index';
import { card } from '../../api';

export interface CardState {
    list: Array<ICard>;
    card: ICard | undefined | null;
}

export const CardModule: Module<CardState, RootState> = {
    state: () => ({
        list: [],
        card: null,
    }),
    getters: {
        getCardList: state => {
            return state.list;
        },
    },
    mutations: {
        SET_CARDS(state, list) {
            state.list = list;
        },
        SET_CARD(state, id: string) {
            state.card = state.list.find(card => card._id === id);
        },
        ADD_CARD(state, card: ICard) {
            state.list.push(card);
        },
        UPDATE_CARD(state, card: ICard) {
            const idx = state.list.findIndex(c => c._id === card._id);
            state.list[idx] = card;
        },
        DELETE_CARD(state, id) {
            const idx = state.list.findIndex(c => c._id === id);
            state.list.splice(idx, 1);
        },
    },
    actions: {
        async getCards({ commit, }) {
            const { success, data } = await card.getCardList();
            if (success) commit('SET_CARDS', data);
        },
        async addCard({ commit, }, input) {
            const { success, data } = await card.createCard(input);
            if (success) {
                commit('ADD_CARD', data);
                return data;
            }
        },
        async updateCard({ commit, }, input) {
            const { success, data } = await card.updateCard(input._id, input);
            if (success) commit('UPDATE_CARD', data);
        },
        async deleteCard({ commit, }, id) {
            const success = await card.deleteCard(id);
            if (success) commit('DELETE_CARD', id);
        }
    },
};