import {UserData} from '@/features/shared/types';
import type {IronSessionOptions} from 'iron-session';

export const ironSessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD!,
  cookieName: 'session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: UserData;
    authorization?: string;
  }
}
