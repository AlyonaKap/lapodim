import api from "@/api/axios";
import { refreshAccessToken } from "@/api/services/auth";
import { getAccessToken, setMemoryAccessToken } from "@/utils/authTokenMemory";
import { isLoggingOut } from "@/utils/logoutState";
import type { AxiosError, AxiosRequestConfig } from "axios";

let refreshPromise: Promise<string> | null = null;

function isUnauthorizedError(error: unknown): error is AxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    (error as AxiosError).response?.status === 401
  );
}

function redirectToLogin(): void {
  if (!isLoggingOut() && window.location.pathname !== "/login") {
    window.location.assign("/login");
  }
}

function buildAuthorizedConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  const token = getAccessToken();

  if (token === null) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
}

async function getFreshAccessToken(): Promise<string> {
  refreshPromise ??= refreshAccessToken().finally(() => {
    refreshPromise = null;
  });

  const token = await refreshPromise;
  setMemoryAccessToken(token);

  return token;
}

export async function apiRequest<TData>(
  config: AxiosRequestConfig,
): Promise<TData> {
  try {
    const response = await api.request<TData>(buildAuthorizedConfig(config));

    return response.data;
  } catch (error) {
    if (!isUnauthorizedError(error)) {
      throw error;
    }

    try {
      const token = await getFreshAccessToken();
      const response = await api.request<TData>({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (refreshError) {
      setMemoryAccessToken(null);
      redirectToLogin();
      throw refreshError;
    }
  }
}
