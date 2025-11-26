import { api } from "@/shared/api/client";
import type { RefreshTokenResponse } from "../types/auth.types";
import type { LoginResponse, RegisterDto } from "../types/auth.types";
import type { User } from "@/features/users/types/user.types";

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

let refreshTokenPromise: Promise<RefreshTokenResponse> | null = null;
const apiVersion = "/api/v1";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      `${apiVersion}/auth/login`,
      credentials
    );
    return response.data;
  },

  register: async (data: RegisterDto): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      `${apiVersion}/auth/register`,
      data
    );
    return response.data;
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    if (refreshTokenPromise) {
      return refreshTokenPromise;
    }

    refreshTokenPromise = (async () => {
      try {
        const response = await api.post<RefreshTokenResponse>(
          `${apiVersion}/auth/refresh-token`
        );
        return response.data;
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
      } finally {
        refreshTokenPromise = null;
      }
    })();

    return refreshTokenPromise;
  },

  logout: async (): Promise<void> => {
    await api.post(`${apiVersion}/auth/logout`);
  },

  me: async (): Promise<User> => {
    const response = await api.get<User>(`${apiVersion}/auth/me`);
    return response.data;
  },

  verifyEmail: async (token: string): Promise<void> => {
    await api.post(`${apiVersion}/auth/verify-email`, { token });
  },

  forgotPassword: async (email: string): Promise<void> => {
    await api.post(`${apiVersion}/auth/forgot-password`, { email });
  },

  resetPassword: async (password: string, token: string): Promise<void> => {
    await api.post(`${apiVersion}/auth/reset-password`, { password, token });
  },
};
