import type { AxiosError } from 'axios';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const httpService = axios.create({
  baseURL: 'https://file-storage-server-theta.vercel.app/api-v1',
});

httpService.interceptors.request.use(
  (config) => {
    const exclude = ['/login', '/register'];
    if (config.url && !exclude.includes(config.url)) {
      const cookie = new Cookies();
      const token = cookie.get('token');
      if (token) {
        config.headers.Authorization = token;
      }
      config.withCredentials = true;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const err = error as AxiosError<ResAPI>;
    const errReject = {
      status: 500,
      message: err.message,
      data: null,
    };
    if (err.response) {
      const { status, statusText, data } = err.response;
      errReject.status = status;
      errReject.message = statusText;
      if (data) {
        errReject.message = data.message;
      }

      if (status === 401) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(errReject);
  },
);

export default httpService;
