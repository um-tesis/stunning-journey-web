import axios, {AxiosInstance} from 'axios';

// Server Side API Server Configuration
const apiServer: AxiosInstance = axios.create({
  baseURL: process.env.SERVER_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

apiServer.interceptors.request.use(
  (config) => {
    return {
      ...config,
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

// At the moment, no API interceptors are needed for Server Side API Calls

// Client Side API Server Configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    return {
      ...config,
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Local Next JS provided API Server Configuration
const localServer: AxiosInstance = axios.create({
  baseURL: process.env.APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const serverHealthCheck = (): Promise<any> => {
  return axios({
    method: 'get',
    url: '/health',
    baseURL: 'http://localhost:5001',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export {apiClient, apiServer, localServer};
