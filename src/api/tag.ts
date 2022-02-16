import { api, authHeader, } from './index';
import { ITagInput, } from '../interfaces/tag';
import { IRes } from '../interfaces/common';

export default {
  getTagList: async (query: object): Promise<IRes> => (await api.get(`tag`, { headers: authHeader(), params: query }))?.data,
  getTagOne:  async (id: string): Promise<IRes> => (await api.get(`tag/${id}`, { headers: authHeader(), }))?.data,
  createTag: async (input: ITagInput): Promise<IRes> => (await api.post('tag', input, { headers: authHeader(), }))?.data,
  updateTag: async (id: string, input: ITagInput): Promise<IRes> => (await api.put(`tag/${id}`, input, { headers: authHeader(), }))?.data,
  deleteTag: async (id: string): Promise<Boolean> => (await api.delete(`tag/${id}`, { headers: authHeader(), }))?.data.success,
}
