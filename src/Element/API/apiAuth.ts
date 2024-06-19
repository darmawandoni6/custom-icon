import httpService from '../../helpers/httpService';
import type { Form } from '../Login';

export const apiLogin = async (payload: Form) => {
  try {
    await httpService.post('/login', payload);
    window.location.href = '/';
  } catch (error) {
    return Promise.reject(error);
  }
};
export const apiProfile = async () => {
  try {
    type Rest = ResAPI<User>;
    const { data } = (await httpService.get<Rest>('/profile')).data;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const apiUpdateProfile = async (payload: { name: string; email: string; password?: string }) => {
  try {
    await httpService.put('/profile', payload);
    const user = await apiProfile();
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const apiLogout = async () => {
  try {
    await httpService.post('/logout');
  } catch (error) {
    return Promise.reject(error);
  }
};
