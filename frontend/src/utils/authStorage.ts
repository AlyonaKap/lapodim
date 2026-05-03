import { AUTH_USER_STORAGE_KEY } from "@/constants/auth";
import type { AuthUser } from "@/types/auth";

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

function getPublicAuthUser(user: AuthUser): AuthUser {
  return {
    email: user.email,
    name: user.name,
    surname: user.surname,
    phone: user.phone,
  };
}

export function getStoredAuthUser(): AuthUser | null {
  if (!hasWindow()) {
    return null;
  }

  const storedUser = window.localStorage.getItem(AUTH_USER_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    const user = getPublicAuthUser(JSON.parse(storedUser) as AuthUser);
    persistAuthUser(user);

    return user;
  } catch {
    window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    return null;
  }
}

export function removeLegacyStoredAuthToken(): void {
  getStoredAuthUser();
}

export function persistAuthUser(user: AuthUser): void {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.setItem(
    AUTH_USER_STORAGE_KEY,
    JSON.stringify(getPublicAuthUser(user)),
  );
}

export function clearStoredAuthUser(): void {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
}
