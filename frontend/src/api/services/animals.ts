import api from "@/api/axios";
import { apiRequest } from "@/api/apiRequest";
import type { AnimalSearchFilters } from "@/types/filters";
import type {
    Adoption,
    Animal,
    AnimalCharacter,
    AnimalListResponse,
    CreateAdoptionPayload,
    UpdateAdoptionStatusPayload,
} from "@/types/animals";

function getAgeDateRange(ageKey: string): { age_min?: string; age_max?: string } {
    const today = new Date();

    switch (ageKey) {
        case "under_year": {
            const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
            return {
                age_min: oneYearAgo.toISOString().split("T")[0],
            };
        }
        case "from_year_to_5": {
            const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
            const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
            return {
                age_min: fiveYearsAgo.toISOString().split("T")[0],
                age_max: oneYearAgo.toISOString().split("T")[0],
            };
        }
        case "over_5": {
            const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
            return {
                age_max: fiveYearsAgo.toISOString().split("T")[0],
            };
        }
        default:
            return {};
    }
}

function buildFilterParams(filters: AnimalSearchFilters): Record<string, string> {
    const params: Record<string, string> = {};

    if (filters.search) {
        params.search = filters.search;
    }

    if (filters.size) {
        params.size = filters.size;
    }

    if (filters.gender) {
        params.gender = filters.gender;
    }

    if (filters.animal_type) {
        params.animal_type = filters.animal_type;
    }

    if (filters.age) {
        const dateRange = getAgeDateRange(filters.age);
        if (dateRange.age_min) {
            params.age_min = dateRange.age_min;
        }
        if (dateRange.age_max) {
            params.age_max = dateRange.age_max;
        }
    }

    if (filters.character.length > 0) {
        params.character = filters.character.join(",");
    }

    return params;
}

export const getAnimals = async (
    filters: AnimalSearchFilters,
    page: number = 1,
    pageSize: number = 12
): Promise<AnimalListResponse> => {
    const response = await api.get("/animals", {
        params: {
            ...buildFilterParams(filters),
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

export const getAnimalCharacters = async (): Promise<AnimalCharacter[]> => {
    const response = await api.get("/animals/characters/");
    return response.data;
};

export const getAdoptions = async (): Promise<Adoption[]> => {
    return apiRequest<Adoption[]>({
        method: "GET",
        url: "/animals/adoptions/",
    });
};

export const createAdoption = async (
    payload: CreateAdoptionPayload
): Promise<Adoption> => {
    return apiRequest<Adoption>({
        method: "POST",
        url: "/animals/adoptions/",
        data: payload,
    });
};

export const deleteAdoption = async (adoptionId: number): Promise<void> => {
    await apiRequest<void>({
        method: "DELETE",
        url: `/animals/adoptions/${adoptionId}/`,
    });
};

export const updateAdoptionStatus = async ({
    adoptionId,
    status,
}: UpdateAdoptionStatusPayload): Promise<Adoption> => {
    return apiRequest<Adoption>({
        method: "PATCH",
        url: `/animals/adoptions/${adoptionId}/`,
        data: { status },
    });
};
