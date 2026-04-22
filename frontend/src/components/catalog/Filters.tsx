import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import type { AnimalSearchFilters } from "@/types/filters";
import {
  sizeOptions,
  genderOptions,
  ageOptions,
  animalTypeOptions,
  characterOptions,
} from "@/utils/filterConstants";

type FiltersProps = {
  filters: AnimalSearchFilters;
  handleFilterChange: (key: keyof AnimalSearchFilters, value: string) => void;
};

export function Filters({ filters, handleFilterChange }: FiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = (): void => {
    setIsFiltersOpen((previousState) => !previousState);
  };

  return (
    <div className="mt-4">
      <div className="relative z-20 flex w-full items-center justify-between rounded-4xl bg-light-blue px-4 py-5 lg:px-12">
        <h4 className="text-3xl text-light-yellow">Допомогти тваринці</h4>

        <Button
          variant="filter"
          size="md"
          onClick={toggleFilters}
          className="relative z-70 cursor-pointer"
        >
          Фільтри
        </Button>
      </div>

      {isFiltersOpen && (
        <div className="relative z-10 -mt-7 rounded-b-4xl bg-light-blue">
          <div className="flex flex-wrap justify-between gap-4 px-4 pb-5 pt-10 text-white lg:px-12">
            <Select
              placeholder="Розмір"
              options={sizeOptions}
              value={filters.size}
              onChange={(value) => handleFilterChange("size", value)}
            />
            <Select
              placeholder="Стать"
              options={genderOptions}
              value={filters.gender}
              onChange={(value) => handleFilterChange("gender", value)}
            />
            <Select
              placeholder="Вік"
              options={ageOptions}
              value={filters.age}
              onChange={(value) => handleFilterChange("age", value)}
            />
            <Select
              placeholder="Тип"
              options={animalTypeOptions}
              value={filters.animal_type}
              onChange={(value) => handleFilterChange("animal_type", value)}
            />
            <Select
              placeholder="Характер"
              options={characterOptions}
              value={filters.character}
              onChange={(value) => handleFilterChange("character", value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
