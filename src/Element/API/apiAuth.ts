import { Cookies } from 'react-cookie';

import httpService from '../../helpers/httpService';
import type { Form as FormLogin } from '../Login';
import { Form as FormRegister } from '../Register';

export const apiLogin = async (payload: FormLogin) => {
  try {
    const { data } = (await httpService.post<ResAPI<{ expired: string; token: string }>>('/login', payload)).data;

    const cookie = new Cookies();
    cookie.set('token', data.token, { expires: new Date(data.expired) });

    window.location.href = '/';
  } catch (error) {
    return Promise.reject(error);
  }
};
export const apiregister = async (payload: FormRegister) => {
  try {
    const { data } = (await httpService.post<ResAPI<{ expired: string; token: string }>>('/register', payload)).data;
    const cookie = new Cookies();
    cookie.set('token', data.token, { expires: new Date(data.expired) });
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
