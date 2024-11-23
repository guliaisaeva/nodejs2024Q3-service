// import {
//   ForbiddenException,
//   Injectable,
//   NotFoundException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { CreateUserDto } from './dto/create.dto';
// import { UpdateUserDto } from './dto/update-password.dto';
// import { User } from './user.entity';
// import { SignupDto } from '../auth/dto/signup.dto';
// import * as bcrypt from 'bcrypt';

// export const users: User[] = [];

// @Injectable()
// export class UsersService {
//   async createUser(signupDto: SignupDto) {
//     const hashedPassword = await bcrypt.hash(signupDto.password, 10);
//     const user = new User(signupDto.login, hashedPassword);
//     users.push(user);
//     return user;
//   }
//   findUserByLogin(login: string): User | undefined {
//     return users.find((user) => user.login === login);
//   }

//   async validateUser(login: string, password: string): Promise<User> {
//     const user = this.findUserByLogin(login);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     throw new UnauthorizedException('Invalid credentials');
//   }
//   findAllUsers() {
//     return users;
//   }

//   findUserById(id: string) {
//     const user = users.find((user) => user.id === id);
//     if (!user) {
//       throw new NotFoundException();
//     }
//     return user;
//   }

//   updateUser(id: string, updateUserDto: UpdateUserDto) {
//     const user = users.find((user) => user.id === id);
//     if (!user) {
//       throw new NotFoundException();
//     }

//     if (user.password !== updateUserDto.oldPassword) {
//       throw new ForbiddenException();
//     }

//     user.password = updateUserDto.newPassword;
//     user.updatedAt = Date.now();
//     user.version++;

//     return user;
//   }

//   removeUser(id: string) {
//     const index = users.findIndex((user) => user.id === id);
//     if (index == -1) {
//       throw new NotFoundException();
//     }
//     users.splice(index, 1);

//     return users;
//   }
// }

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-password.dto';
import { User } from './user.entity';
import { SignupDto } from '../auth/dto/signup.dto';
import * as bcrypt from 'bcrypt';

export const users: User[] = [];

@Injectable()
export class UsersService {
  async createUser(signupDto: SignupDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const user = new User(signupDto.login, hashedPassword);
    users.push(user);
    return user;
  }

  async findUserByLogin(login: string): Promise<User | undefined> {
    return users.find((user) => user.login === login);
  }

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.findUserByLogin(login);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  findAllUsers(): User[] {
    return users;
  }

  findUserById(id: string): User {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findUserById(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;

    return user;
  }

  removeUser(id: string): User[] {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    users.splice(index, 1);
    return users;
  }
}
