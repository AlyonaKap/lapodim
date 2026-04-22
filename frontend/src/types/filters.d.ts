export type AnimalSearchFilters = {
    size: string;
    gender: string;
    age: string;
    animal_type: string;
    character: string;
}

export type SearchFilterKey = keyof AnimalSearchFilters;