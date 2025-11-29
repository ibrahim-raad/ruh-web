import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../api/auth.service";
import { Spinner } from "@/shared/components/loading/Spinner";
import { UserRole } from "@/features/users/types/user.types";
import { therapistsService } from "@/features/therapists/api/therapists.service";
import { adminsService } from "@/features/admins/api/admins.service";

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

          let therapist;
          let admin;

          if (user.role === UserRole.THERAPIST) {
            try {
              therapist = await therapistsService.getMe();
            } catch (error) {
              console.error("Failed to fetch therapist details", error);
            }
          } else if (user.role === UserRole.ADMIN) {
            try {
              admin = await adminsService.getMe();
            } catch (error) {
              console.error("Failed to fetch admin details", error);
            }
          }

          login(accessToken, user, therapist, admin);
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
