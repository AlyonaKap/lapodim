import { refreshAccessToken } from "@/api/services/auth";
import { getCurrentUser } from "@/api/services/user";
import { AuthContext } from "@/contexts/AuthContext";
import type { AuthUser } from "@/types/auth";
import { setMemoryAccessToken } from "@/utils/authTokenMemory";
import {
  clearStoredAuthUser,
  getStoredAuthUser,
  persistAuthUser,
} from "@/utils/authStorage";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUserState] = useState<AuthUser | null>(() =>
    getStoredAuthUser(),
  );

  const setAccessToken = (token: string | null): void => {
    setMemoryAccessToken(token);
    setAccessTokenState(token);
  };

  const setUser = (nextUser: AuthUser | null): void => {
    setUserState(nextUser);

    if (nextUser) {
      persistAuthUser(nextUser);
      return;
    }

    clearStoredAuthUser();
  };

  useEffect(() => {
    let isMounted = true;

    async function restoreAccessToken(): Promise<void> {
      try {
        const token = await refreshAccessToken();

        if (isMounted) {
          setAccessToken(token);

          const currentUser = await getCurrentUser();

          if (isMounted) {
            setUser(currentUser);
          }
        }
      } catch {
        if (isMounted) {
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    }

    void restoreAccessToken();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      isAuthLoading,
      setAccessToken,
      setUser,
      user,
    }),
    [accessToken, isAuthLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
