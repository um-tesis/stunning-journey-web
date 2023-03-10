export const hasLowercase = (password: string) => /.*[a-z].*/.test(password);
export const hasUppercase = (password: string) => /.*[A-Z].*/.test(password);
export const hasNumber = (password: string) => /.*[0-9].*/.test(password);
export const hasSpecialCharacter = (password: string) => /[^a-zA-Z0-9]/.test(password);
export const hasEightCharacters = (password: string) => password.length > 7;

export const validPassword = (password: string): boolean =>
  hasLowercase(password) &&
  hasUppercase(password) &&
  hasEightCharacters(password) &&
  hasSpecialCharacter(password) &&
  hasNumber(password);
