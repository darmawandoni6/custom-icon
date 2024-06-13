import httpService from '../../helpers/httpService';
import { apilist } from './myFile';

export const apiUploadFile = async (payload: FormData, filter?: string, open?: string) => {
  try {
    await httpService.post('/file', payload);
    const { data, meta } = await apilist({ filter, open });
    return { data, meta: meta as Meta };
  } catch (error) {
    return Promise.reject(error);
  }
};
