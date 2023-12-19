import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@guest-logix/domain';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Omit<User, 'password'>[] | null> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
    if (!(await this.userExists(id))) throw new Error('User does not exist');
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(
    id: string,
    user: User
  ): Promise<Omit<User, 'password'> | null> {
    if (!(await this.userExists(id))) throw new Error('User does not exist');
    return this.prisma.user.update({ where: { id }, data: user });
  }

  async deleteUser(id: string): Promise<Omit<User, 'password'> | null> {
    if (!(await this.userExists(id))) throw new Error('User does not exist');
    return this.prisma.user.delete({ where: { id } });
  }

  private async userExists(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return !!user;
  }
}
