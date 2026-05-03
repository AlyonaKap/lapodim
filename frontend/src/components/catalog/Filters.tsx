import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CheckboxSelect } from "@/components/ui/CheckboxSelect";
import type { AnimalSearchFilters } from "@/types/filters";
import {
  sizeOptions,
  genderOptions,
  ageOptions,
  animalTypeOptions,
  type FilterOption,
} from "@/utils/filterConstants";

type FiltersProps = {
  filters: AnimalSearchFilters;
  characterOptions: FilterOption[];
  handleFilterChange: (key: keyof AnimalSearchFilters, value: string) => void;
  handleCharacterToggle: (value: string) => void;
};

export function Filters({
  characterOptions,
  filters,
  handleFilterChange,
  handleCharacterToggle,
}: FiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = (): void => {
    setIsFiltersOpen((previousState) => !previousState);
  };

  return (
    <div className="mt-4">
      <div className="relative z-20 flex items-center gap-4 rounded-4xl bg-light-blue px-4 py-5 lg:px-12">
        <div className="flex-1 min-w-0">
          <Input
            inputSize="lg"
            placeholder="Пошук..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="lg:w-[70%]"
          />
        </div>

        <Button
          variant="filter"
          size="md"
          onClick={toggleFilters}
          className="relative z-70 cursor-pointer shrink-0"
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
            <CheckboxSelect
              placeholder="Характер"
              options={characterOptions}
              values={filters.character}
              onChange={handleCharacterToggle}
            />
          </div>
        </div>
      )}
    </div>
  );
}
