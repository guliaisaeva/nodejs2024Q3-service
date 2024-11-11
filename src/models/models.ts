export interface TUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface TArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
