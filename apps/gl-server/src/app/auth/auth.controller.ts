import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  AuthenticatedUser,
  AuthService,
  ExtendedUser,
  LoginCredentials,
} from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginCredentials: LoginCredentials
  ): Promise<AuthenticatedUser> {
    try {
      return await this.authService.login(loginCredentials);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('register')
  @HttpCode(200)
  async registerUser(
    @Body() user: ExtendedUser
  ): Promise<AuthenticatedUser | null> {
    try {
      return await this.authService.registerUser(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
