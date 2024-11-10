import { IsString, IsUUID } from 'class-validator';

export class User {
  @IsUUID()
  id: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
