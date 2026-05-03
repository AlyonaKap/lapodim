import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserLike,
  deleteUserLikeByAnimal,
  getUserLikes,
} from "@/api/services/userLikes";
import type { CreateUserLikePayload } from "@/types/animals";

export const USER_LIKES_QUERY_KEY = ["user-likes"] as const;

export function useGetUserLikes(isEnabled: boolean) {
  return useQuery({
    queryKey: USER_LIKES_QUERY_KEY,
    queryFn: getUserLikes,
    enabled: isEnabled,
  });
}

export function useCreateUserLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserLikePayload) => createUserLike(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: USER_LIKES_QUERY_KEY });
    },
  });
}

export function useDeleteUserLikeByAnimal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (animalId: number) => deleteUserLikeByAnimal(animalId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: USER_LIKES_QUERY_KEY });
    },
  });
}
