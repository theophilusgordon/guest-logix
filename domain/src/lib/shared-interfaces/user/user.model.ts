import { Role } from '@prisma/client';

export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  otherNames: string;
  password: string;
  company: string;
  photoUrl?: string;
  role?: Role;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUser = User & { confirmPassword: string };
