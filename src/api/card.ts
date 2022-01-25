import { api, authHeader, } from './index';
import { ICardInput, } from '../interfaces/card';
import { IRes } from '../interfaces/common';

export default {
    getCardList: async (): Promise<IRes> => (await api.get('card', { headers: authHeader(), }))?.data,
    getCardOne:  async (id: string): Promise<IRes> => (await api.get(`card/${id}`, { headers: authHeader(), }))?.data,
    createCard: async (input: ICardInput): Promise<IRes> => (await api.post('card', input, { headers: authHeader(), }))?.data,
    updateCard: async (id: string, input: ICardInput): Promise<IRes> => (await api.put(`card/${id}`, input, { headers: authHeader(), }))?.data,
    deleteCard: async (id: string): Promise<Boolean> => (await api.delete(`card/${id}`, { headers: authHeader(), }))?.data.success,
}