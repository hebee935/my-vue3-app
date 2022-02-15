import { api, authHeader, } from './index';
import { IFileInput, } from '../interfaces/file';
import { IRes } from '../interfaces/common';

export default {
  getFileList: async (): Promise<IRes> => (await api.get('file', { headers: authHeader(), }))?.data,
  getFileOne:  async (id: string): Promise<IRes> => (await api.get(`file/${id}`, { headers: authHeader(), }))?.data,
  getFileObject:  async (id: string): Promise<IRes> => (await api.get(`file/${id}/object`, { headers: authHeader(), responseType: 'blob' }))?.data,
  uploadFile: async (input: IFileInput): Promise<IRes> => {
    const frm = new FormData();
    frm.append('file', input.file);
    frm.append('category', input.category);
    return (await api.post('file', frm, { headers: {...authHeader(), ...{ 'Content-Type': 'multipart/form-data' }}, }))?.data
  },
  updateFile: async (id: string, input: IFileInput): Promise<IRes> => (await api.put(`file/${id}`, input, { headers: authHeader(), }))?.data,
  deleteFile: async (id: string): Promise<Boolean> => (await api.delete(`file/${id}`, { headers: authHeader(), }))?.data.success,
}
