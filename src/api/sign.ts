import { api } from './index';
import { ISignInInput, ISignUpInput, } from '../interfaces/user';
import { IRes } from '../interfaces/common';

export default {
  signin: async (input: ISignInInput): Promise<IRes> => (await api.post('signin', input))?.data,
  signup: async (input: ISignUpInput): Promise<IRes> => (await api.post('signup', input))?.data,
  checkUid: async (uid: string): Promise<IRes> => (await api.post(`verify/uid/${uid}`))?.data,
}
