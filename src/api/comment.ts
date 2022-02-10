import { api, authHeader, } from './index';
import { ICommentInput, } from '../interfaces/comment';
import { IRes } from '../interfaces/common';

export default {
  getCommentList: async (cardid: string): Promise<IRes> => (await api.get(`comment?cardid=${cardid}`, { headers: authHeader(), }))?.data,
  getCommentOne:  async (id: string): Promise<IRes> => (await api.get(`comment/${id}`, { headers: authHeader(), }))?.data,
  createComment: async (input: ICommentInput): Promise<IRes> => (await api.post('comment', input, { headers: authHeader(), }))?.data,
  updateComment: async (id: string, input: ICommentInput): Promise<IRes> => (await api.put(`comment/${id}`, input, { headers: authHeader(), }))?.data,
  deleteComment: async (id: string): Promise<Boolean> => (await api.delete(`comment/${id}`, { headers: authHeader(), }))?.data.success,
}
