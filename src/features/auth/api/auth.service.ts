import { api } from "@/shared/api/client";
import type { User } from "../types/auth.types";
import type { LoginResponse, Tokens } from "../types/auth.types";

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      "/api/v1/auth/login",
      credentials
    );
    return response.data;
  },

  refreshToken: async (): Promise<Tokens> => {
    const response = await api.post<Tokens>("/api/v1/auth/refresh-token");
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  me: async (): Promise<User> => {
    const response = await api.get<User>("/api/v1/auth/me");
    return response.data;
  },
};
