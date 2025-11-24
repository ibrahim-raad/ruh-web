import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../api/auth.service";
import { ROUTES } from "@/shared/config/routes";
import { UserRole } from "@/features/users/types/user.types";
import { Spinner } from "@/shared/components/loading/Spinner";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, login, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(!isAuthenticated);
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      if (!isAuthenticated) {
        try {
          const { access_token: accessToken } =
            await authService.refreshToken();
          if (!accessToken) {
            throw new Error("No access token found");
          }
          const userData = await authService.me();
          login(accessToken, userData);
        } catch (error) {
          console.error("Error initializing authentication:", error);
          logout();
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [isAuthenticated, login, logout]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />
    );
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.ERROR.FORBIDDEN} replace />;
  }

  return <Outlet />;
};
