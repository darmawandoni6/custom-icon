import httpService from '../../helpers/httpService';
import { apilist } from './myFile';

export const apiUploadFile = async (payload: FormData, params?: Partial<ParamsList>) => {
  try {
    await httpService.post('/file', payload);
    const { data, meta } = await apilist(params);
    return { data, meta: meta as Meta, params };
  } catch (error) {
    return Promise.reject(error);
  }
};
