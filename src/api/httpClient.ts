import axios, { AxiosInstance } from 'axios';
import config from 'config';

export const createInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: config.apiUrl,
  });
};

export const httpClient: AxiosInstance = createInstance();
