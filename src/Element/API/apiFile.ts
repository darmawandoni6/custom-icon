import httpService from '../../helpers/httpService';
import { apilist } from './myFile';

export const apiUpdateFile = async (id: string, payload: Partial<List>, params?: Partial<ParamsList>) => {
  try {
    await httpService.put(`/file/${id}`, payload, { params });
  } catch (error) {
    return Promise.reject(error);
  }
};
export const apiRemoveFile = async (id: string) => {
  try {
    await httpService.delete(`/file/${id}`);
    const { data, meta } = await apilist();
    return { data, meta: meta as Meta };
  } catch (error) {
    return Promise.reject(error);
  }
};
