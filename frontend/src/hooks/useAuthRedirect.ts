import { LOGIN_ROUTE } from "@/constants/auth";
import type { AuthIntent } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useAuthRedirect() {
  const { isAuthLoading, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectToLogin = useCallback((intent: AuthIntent): void => {
    navigate(LOGIN_ROUTE, {
      state: {
        from: `${location.pathname}${location.search}`,
        intent,
      },
    });
  }, [location.pathname, location.search, navigate]);

  return {
    isAuthenticated: Boolean(user),
    isAuthLoading,
    redirectToLogin,
    user,
  };
}
