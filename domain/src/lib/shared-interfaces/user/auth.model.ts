import { User } from './user.model';

export interface AuthenticatedUser {
  access_token: string;
  user: Omit<User, 'password'>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
