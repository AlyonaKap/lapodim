import { logoutUser } from "@/api/services/auth";
import { useAuth } from "@/hooks/useAuth";
import { beginLogout, finishLogout } from "@/utils/logoutState";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuth();

  return useCallback(async (): Promise<void> => {
    beginLogout();

    try {
      await logoutUser();
    } finally {
      setAccessToken(null);
      setUser(null);
      navigate("/", { replace: true });
      window.setTimeout(finishLogout, 1000);
    }
  }, [navigate, setAccessToken, setUser]);
}
