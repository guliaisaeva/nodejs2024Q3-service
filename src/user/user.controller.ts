import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create.dto';
import { UUIDvalidate } from './pipe/user.UUID';
import { UpdateUserDto } from './dto/update-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @HttpCode(200)
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @HttpCode(200)
  findUserById(@Param('id', UUIDvalidate) id: string) {
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(
    @Param('id', UUIDvalidate) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  removeUser(@Param('id', UUIDvalidate) id: string) {
    return this.usersService.removeUser(id);
  }
}
