import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export const createUser = (login: string, password: string): User => {
  const timestamp = Date.now();
  return {
    id: uuidv4(),
    login,
    password,
    version: 1,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};
