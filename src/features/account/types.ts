export type UserBasicInfo = {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
};

export type ChangePasswordInput = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
