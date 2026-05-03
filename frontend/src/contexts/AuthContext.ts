import { createContext } from "react";

import type { AuthUser } from "@/types/auth";

export type AuthContextValue = {
  accessToken: string | null;
  isAuthLoading: boolean;
  setAccessToken: (token: string | null) => void;
  setUser: (user: AuthUser | null) => void;
  user: AuthUser | null;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
