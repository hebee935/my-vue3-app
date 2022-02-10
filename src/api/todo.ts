import { api, authHeader, } from './index';
import { ITodoInput, } from '../interfaces/todo';
import { IRes } from '../interfaces/common';

export default {
  getTodoList: async (): Promise<IRes> => (await api.get('todo', { headers: authHeader(), }))?.data,
  getTodoOne:  async (id: string): Promise<IRes> => (await api.get(`todo/${id}`, { headers: authHeader(), }))?.data,
  createTodo: async (input: ITodoInput): Promise<IRes> => (await api.post('todo', input, { headers: authHeader(), }))?.data,
  updateTodo: async (id: string, input: ITodoInput): Promise<IRes> => (await api.put(`todo/${id}`, input, { headers: authHeader(), }))?.data,
  deleteTodo: async (id: string): Promise<Boolean> => (await api.delete(`todo/${id}`, { headers: authHeader(), }))?.data.success,
}
