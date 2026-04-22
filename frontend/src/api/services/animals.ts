import api from "@/api/axios";
import type { AnimalSearchFilters } from "@/types/filters";
import type { Animal, AnimalListResponse } from "@/types/animals";

export const getAnimals = async (
    filters: AnimalSearchFilters,
    page: number = 1,
    pageSize: number = 12
): Promise<AnimalListResponse> => {
    const response = await api.get("/animals", {
        params: {
            ...filters,
            page,
            page_size: pageSize
        }
    });
    return response.data;
};

export const getAnimalById = async (animalId: number): Promise<Animal> => {
    const response = await api.get(`/animals/${animalId}`);
    return response.data;
};
