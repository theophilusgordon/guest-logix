import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@guest-logix/domain';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';

export type ExtendedUser = User & { confirmPassword: string };
export interface AuthenticatedUser {
  access_token: string;
  user: Omit<User, 'password'>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  async registerUser(user: ExtendedUser): Promise<AuthenticatedUser | null> {
    const emailUsed: User = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    const phoneUsed: User = await this.prisma.user.findUnique({
      where: { phone: user.phone },
    });

    if (emailUsed) throw new Error('Email already in use');
    if (phoneUsed) throw new Error('Phone number already in use');

    user.password = await this.verifyAndHashPassword(
      user.password,
      user.confirmPassword
    );
    await this.prisma.user.create({ data: user });
    return this.login({ email: user.email, password: user.password });
  }

  async login(loginCredentials: LoginCredentials): Promise<AuthenticatedUser> {
    const user = await this.validateUser(
      loginCredentials.email,
      loginCredentials.password
    );
    const payload = { id: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '4h',
        secret: process.env.JWT_SECRET,
      }),
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        otherNames: user.otherNames,
        company: user.company,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getFullUserByEmail(email);
    if (!user) {
      throw new Error('Incorrect user email or password');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Incorrect user email or password');
    }
    return user;
  }
  private async verifyAndHashPassword(
    password: string,
    confirmPassword: string
  ): Promise<string> {
    if (password !== confirmPassword) throw new Error('Passwords do not match');
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async getFullUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: email } });
  }
}
