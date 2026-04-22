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
