import { useState } from "react";
import type { AnimalSearchFilters, SearchFilterKey } from "@/types/filters";

const initialFilters: AnimalSearchFilters = {
  size: "",
  gender: "",
  age: "",
  animal_type: "",
  character: "",
};

export function useFilters() {
  const [filters, setFilters] = useState<AnimalSearchFilters>(initialFilters);

  const handleFilterChange = (filter: SearchFilterKey, value: string): void => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [filter]: value,
    }));
  };

  return {
    filters,
    handleFilterChange,
  };
}
