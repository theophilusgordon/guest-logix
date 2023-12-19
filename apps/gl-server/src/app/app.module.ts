import { Module } from '@nestjs/common';

import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UserController, AuthController],
  providers: [PrismaService, JwtService, UserService, AuthService],
})
export class AppModule {}
