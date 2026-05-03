export type AnimalSearchFilters = {
    search: string;
    size: string;
    gender: string;
    age: string;
    animal_type: string;
    character: string[];
}

export type SearchFilterKey = keyof AnimalSearchFilters;