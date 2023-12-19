import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@guest-logix/domain';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @HttpCode(200)
  async getAllUsers(): Promise<Omit<User, 'password'>[] | null> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user/:id')
  @HttpCode(200)
  async getUserById(
    @Param() id: string
  ): Promise<Omit<User, 'password'> | null> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('user/:id')
  @HttpCode(200)
  async updateUser(
    @Param() id: string,
    @Body() user: User
  ): Promise<Omit<User, 'password'> | null> {
    try {
      return await this.userService.updateUser(id, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('user/:id')
  @HttpCode(200)
  async deleteUser(
    @Param() id: string
  ): Promise<Omit<User, 'password'> | null> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
