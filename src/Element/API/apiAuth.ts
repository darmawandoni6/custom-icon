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
