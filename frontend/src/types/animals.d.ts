export type Animal = {
    id: number;
    name: string;
    age: number | string;
    gender: string;
    size: string;
    description: string;
    animal_type: string;
    characters: string[];
    image_url: string | null;
    is_adopted: boolean;
}

export type DisplayAnimal = {
    name: string;
    imageUrl: string;
}

export type AnimalListResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Animal[];
}

export type AnimalCharacter = {
    id: number;
    character_type: string;
}

export type AdoptionStatus = "pending" | "approved" | "rejected";

export type Adoption = {
    id: number;
    animal: Animal;
    status: AdoptionStatus;
    created_at: string;
}

export type CreateAdoptionPayload = {
    animal_id: number;
}

export type UpdateAdoptionStatusPayload = {
    adoptionId: number;
    status: AdoptionStatus;
}

export type UserLike = {
    animal: Animal;
    created_at: string;
}

export type CreateUserLikePayload = {
    animal_id: number;
}
