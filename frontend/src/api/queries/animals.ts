import { useQuery } from "@tanstack/react-query";
import { getAnimalById, getAnimals } from "@/api/services/animals";
import type { AnimalSearchFilters } from "@/types/filters";

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
