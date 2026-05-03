import { LOGIN_ROUTE } from "@/constants/auth";
import type { AuthIntent, AuthRouteState } from "@/types/auth";
import { useLocation, useNavigate } from "react-router-dom";

function getCurrentPath(pathname: string, search: string, hash: string): string {
  return `${pathname}${search}${hash}` || "/";
}

export function useOpenLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (intent?: AuthIntent) => {
    const routeState: AuthRouteState = {
      from: getCurrentPath(location.pathname, location.search, location.hash),
      intent,
    };

    navigate(LOGIN_ROUTE, { state: routeState });
  };
}
