import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../api/auth.service";
import { Spinner } from "@/shared/components/loading/Spinner";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isAuthenticated, login, logout, setAccessToken } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (isAuthenticated) {
        setIsInitializing(false);
        return;
      }

      try {
        const { access_token: accessToken } = await authService.refreshToken();
        if (accessToken) {
          setAccessToken(accessToken);
          const user = await authService.me();
          login(accessToken, user);
        } else {
          logout();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        logout();
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, [isAuthenticated, login, logout, setAccessToken]);

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
};
