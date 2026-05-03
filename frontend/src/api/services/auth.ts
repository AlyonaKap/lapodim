import { authenticatedApi } from "@/api/axios";
import type {
  AuthSession,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from "@/types/auth";

type AuthResponse = {
  user: AuthUser & {
    access: string;
  };
};

type RefreshResponse = {
  access: string;
};

function getAuthSession(response: AuthResponse): AuthSession {
  const { access, ...user } = response.user;

  return {
    access,
    user,
  };
};

export async function loginUser(
  credentials: LoginCredentials,
): Promise<AuthSession> {
  const response = await authenticatedApi.post<AuthResponse>("/users/login/", {
    user: credentials,
  });

  return getAuthSession(response.data);
}

export async function registerUser(
  credentials: RegisterCredentials,
): Promise<AuthSession> {
  const response = await authenticatedApi.post<AuthResponse>("/users/register/", {
    user: credentials,
  });

  return getAuthSession(response.data);
}

export async function refreshAccessToken(): Promise<string> {
  const response = await authenticatedApi.post<RefreshResponse>(
    "/users/token/refresh/",
  );

  return response.data.access;
}

export async function logoutUser(): Promise<void> {
  await authenticatedApi.post("/users/logout/");
}
