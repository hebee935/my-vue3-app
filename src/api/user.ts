import { api, authHeader, } from './index';
import { IUserInput, } from '../interfaces/user';
import { IRes } from '../interfaces/common';

export default {
  getUserList: async (): Promise<IRes> => (await api.get('user', { headers: authHeader(), }))?.data,
  getUserOne:  async (id: string): Promise<IRes> => (await api.get(`user/${id}`, { headers: authHeader(), }))?.data,
  updateUser: async (id: string, input: IUserInput): Promise<IRes> => (await api.put(`user/${id}`, input, { headers: authHeader(), }))?.data,
  deleteUser: async (id: string): Promise<Boolean> => (await api.delete(`user/${id}`, { headers: authHeader(), }))?.data.success,
}
