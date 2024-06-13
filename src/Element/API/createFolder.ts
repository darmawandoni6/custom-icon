import httpService from '../../helpers/httpService';
import { apilist } from './myFile';

export type PCreateFolder = {
  folder: string;
  sub?: string;
};
export const apicReateFolder = async (payload: PCreateFolder) => {
  try {
    await httpService.post('/folder', payload);
    const { data, meta } = await apilist();
    return { data, meta: meta as Meta };
  } catch (error) {
    return Promise.reject(error);
  }
};
