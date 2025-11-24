import type { User } from "@/features/users/types/user.types";

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
