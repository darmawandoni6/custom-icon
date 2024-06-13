import httpService from '../../helpers/httpService';
import { apilist } from './myFile';

export type PCreateFolder = {
  folder: string;
  sub?: string;
};
export const apicReateFolder = async (payload: PCreateFolder, params?: Partial<ParamsList>) => {
  try {
    await httpService.post('/folder', payload);
    const { data, meta } = await apilist(params);
    return { data, meta: meta as Meta, params };
  } catch (error) {
    return Promise.reject(error);
  }
};
