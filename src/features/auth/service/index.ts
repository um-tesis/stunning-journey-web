import {localServer} from '@utils/api-settings';
import {AxiosResponse} from 'axios';

export const logIn = async (email: string, password: string): Promise<AxiosResponse | any> => {
  try {
    const res = await localServer.post(`/api/auth/login`, {
      email,
      password,
    });
    return res;
  } catch (error: any) {
    throw error;
  }
};

export const logOut = (): Promise<void> => {
  return localServer.post(`/api/auth/logout`);
};
