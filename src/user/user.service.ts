import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update-password.dto';
import { User } from './user.entity';

export const users: User[] = [];

@Injectable()
export class UsersService {
  createUser(createUserDto: CreateUserDto) {
    const user = new User(createUserDto.login, createUserDto.password);
    users.push(user);
    return user;
  }

  findAllUsers() {
    return users;
  }

  findUserById(id: string) {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;

    return user;
  }

  removeUser(id: string) {
    const index = users.findIndex((user) => user.id === id);
    if (index == -1) {
      throw new NotFoundException();
    }
    users.splice(index, 1);

    return users;
  }
}
