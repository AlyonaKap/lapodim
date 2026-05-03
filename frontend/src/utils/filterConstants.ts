export type FilterOption = {
    value: string;
    label: string;
};

export const genderOptions: FilterOption[] = [
    { value: "boy", label: "Хлопчик" },
    { value: "girl", label: "Дівчинка" },
];

export const sizeOptions: FilterOption[] = [
    { value: "small", label: "Малий" },
    { value: "medium", label: "Середній" },
    { value: "large", label: "Великий" },
];

export const ageOptions: FilterOption[] = [
    { value: "under_year", label: "До року" },
    { value: "from_year_to_5", label: "1-5 років" },
    { value: "over_5", label: "5+ років" },
];

export const animalTypeOptions: FilterOption[] = [
    { value: "Собака", label: "Собака" },
    { value: "Кіт", label: "Кіт" },
];
