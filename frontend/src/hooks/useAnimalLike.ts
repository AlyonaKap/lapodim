import {
  useCreateUserLike,
  useDeleteUserLikeByAnimal,
  useGetUserLikes,
} from "@/api/queries/userLikes";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export function useAnimalLike(animalId: number) {
  const { isAuthenticated, isAuthLoading, redirectToLogin } = useAuthRedirect();
  const likesQuery = useGetUserLikes(isAuthenticated);
  const createLikeMutation = useCreateUserLike();
  const deleteLikeMutation = useDeleteUserLikeByAnimal();

  const isLiked =
    likesQuery.data?.some((like) => like.animal.id === animalId) ?? false;

  const handleLike = async (): Promise<void> => {
    if (!isAuthenticated) {
      redirectToLogin("likes");
      return;
    }

    if (createLikeMutation.isPending || deleteLikeMutation.isPending) {
      return;
    }

    if (isLiked) {
      await deleteLikeMutation.mutateAsync(animalId);
      return;
    }

    await createLikeMutation.mutateAsync({ animal_id: animalId });
  };

  const isLikePending =
    createLikeMutation.isPending || deleteLikeMutation.isPending;

  return {
    handleLike,
    isLikeDisabled: isAuthLoading || isLikePending,
    isLikePending,
    isLiked,
  };
}
