export interface UserData {
  id: number;
  email: string;
  name: string;
  organizationId: number;
  phone: string;
  role: string;
}

export type UserDataIn = Omit<UserData, 'id'> & {password: string};
