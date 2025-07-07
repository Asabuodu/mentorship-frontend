import { jwtDecode } from 'jwt-decode';

export const decodeUser = (token: string): { userId: string; role: string } => {
  return jwtDecode(token);
};
