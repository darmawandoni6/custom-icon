import axios, { type AxiosError } from 'axios';

const httpService = axios.create({
  baseURL: 'http://localhost:4000/api-v1',
});

httpService.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);
httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const err = error as AxiosError;
    return Promise.reject(err);
  },
);

export default httpService;
