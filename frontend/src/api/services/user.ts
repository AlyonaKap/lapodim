import { apiRequest } from "@/api/apiRequest";
import type { AuthUser, UpdateUserPayload } from "@/types/auth";

type UserResponse = {
  user: AuthUser;
};

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await apiRequest<UserResponse>({
    method: "GET",
    url: "/users/user/",
  });

  return response.user;
}

export async function updateCurrentUser(
  payload: UpdateUserPayload,
): Promise<AuthUser> {
  const response = await apiRequest<UserResponse>({
    method: "PATCH",
    url: "/users/user/",
    data: {
      user: payload,
    },
  });

  return response.user;
}
