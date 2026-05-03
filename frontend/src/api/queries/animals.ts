import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createAdoption,
    deleteAdoption,
    getAdoptions,
    getAnimalCharacters,
    getAnimalById,
    getAnimals,
    updateAdoptionStatus,
} from "@/api/services/animals";
import type { AnimalSearchFilters } from "@/types/filters";
import type {
    CreateAdoptionPayload,
    UpdateAdoptionStatusPayload,
} from "@/types/animals";

export const useGetAnimals = (
    filters: AnimalSearchFilters,
    page: number = 1,
    pageSize: number = 12
) => {
    return useQuery({
        queryKey: ["animals", filters, page, pageSize],
        queryFn: () => getAnimals(filters, page, pageSize),
    });
};

export const useGetAnimalById = (animalId: number, isEnabled: boolean) => {
    return useQuery({
        queryKey: ["animal", animalId],
        queryFn: () => getAnimalById(animalId),
        enabled: isEnabled,
    });
};

export const useGetAnimalCharacters = () => {
    return useQuery({
        queryKey: ["animal-characters"],
        queryFn: getAnimalCharacters,
    });
};

export const useGetAdoptions = (isEnabled: boolean) => {
    return useQuery({
        queryKey: ["adoptions"],
        queryFn: getAdoptions,
        enabled: isEnabled,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        refetchInterval: isEnabled ? 5000 : false,
    });
};

export const useCreateAdoption = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateAdoptionPayload) => createAdoption(payload),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["adoptions"] });
        },
    });
};

export const useDeleteAdoption = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (adoptionId: number) => deleteAdoption(adoptionId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["adoptions"] });
        },
    });
};

export const useUpdateAdoptionStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateAdoptionStatusPayload) =>
            updateAdoptionStatus(payload),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["adoptions"] });
        },
    });
};
