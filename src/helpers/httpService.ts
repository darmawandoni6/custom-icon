import axios, { type AxiosError } from 'axios';

const httpService = axios.create({
  baseURL: 'http://localhost:4000/api-v1',
  withCredentials: true,
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
