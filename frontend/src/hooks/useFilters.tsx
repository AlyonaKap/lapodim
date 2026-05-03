import { useCallback, useState } from "react";
import type { AnimalSearchFilters, SearchFilterKey } from "@/types/filters";

const initialFilters: AnimalSearchFilters = {
  search: "",
  size: "",
  gender: "",
  age: "",
  animal_type: "",
  character: [],
};

export function useFilters() {
  const [filters, setFilters] = useState<AnimalSearchFilters>(initialFilters);

  const handleFilterChange = useCallback(
    (filter: SearchFilterKey, value: string): void => {
      setFilters((previousFilters) => ({
        ...previousFilters,
        [filter]: value,
      }));
    },
    [],
  );

  const handleCharacterToggle = useCallback((value: string): void => {
    setFilters((previousFilters) => {
      const current = previousFilters.character;
      const isSelected = current.includes(value);

      return {
        ...previousFilters,
        character: isSelected
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  }, []);

  return {
    filters,
    handleFilterChange,
    handleCharacterToggle,
  };
}
