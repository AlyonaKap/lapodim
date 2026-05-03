import { apiRequest } from "@/api/apiRequest";
import type { CreateUserLikePayload, UserLike } from "@/types/animals";

export async function getUserLikes(): Promise<UserLike[]> {
  return apiRequest<UserLike[]>({
    method: "GET",
    url: "/users/likes/",
  });
}

export async function createUserLike(
  payload: CreateUserLikePayload,
): Promise<UserLike> {
  return apiRequest<UserLike>({
    method: "POST",
    url: "/users/likes/",
    data: payload,
  });
}

export async function deleteUserLikeByAnimal(animalId: number): Promise<void> {
  await apiRequest<void>({
    method: "DELETE",
    url: `/users/likes/by-animal/${animalId}/`,
  });
}
