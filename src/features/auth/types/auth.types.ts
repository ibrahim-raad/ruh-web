import type { User, UserRole } from "@/features/users/types/user.types";

export interface LoginResponse {
  tokens: Tokens;
  user: User;
}

export interface Tokens {
  access_token?: string;
  refresh_token?: string;
}

export interface RefreshTokenResponse {
  access_token: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
}
