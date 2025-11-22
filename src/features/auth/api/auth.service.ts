import { api } from "@/shared/api/client";
import type { RefreshTokenResponse, User } from "../types/auth.types";
import type { LoginResponse } from "../types/auth.types";

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

let refreshTokenPromise: Promise<RefreshTokenResponse> | null = null;

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      "/api/v1/auth/login",
      credentials
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
          "/api/v1/auth/refresh-token"
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
    await api.post("/auth/logout");
  },

  me: async (): Promise<User> => {
    const response = await api.get<User>("/api/v1/auth/me");
    return response.data;
  },
};
