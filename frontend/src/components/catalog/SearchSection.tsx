import { useGetAnimalCharacters, useGetAnimals } from "@/api/queries/animals";
import { useFilters } from "@/hooks/useFilters";
import { useCallback, useMemo, useState } from "react";

import { Filters } from "@/components/catalog/Filters";
import { AnimalSearchResults } from "@/components/catalog/AnimalSearchResults";
import { Pagination } from "@/components/catalog/Pagination";

const PAGE_SIZE = 8;

export function SearchSection() {
  const { filters, handleFilterChange, handleCharacterToggle } = useFilters();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetAnimals(filters, page, PAGE_SIZE);
  const { data: characters = [] } = useGetAnimalCharacters();
  const searchResults = data?.results ?? [];
  const totalPages = data ? Math.max(1, Math.ceil(data.count / PAGE_SIZE)) : 1;
  const characterOptions = useMemo(
    () =>
      characters.map((character) => ({
        value: character.character_type,
        label: character.character_type,
      })),
    [characters],
  );

  const handleFilterChangeWithPageReset = useCallback(
    (key: keyof typeof filters, value: string) => {
      handleFilterChange(key, value);
      setPage(1);
    },
    [handleFilterChange],
  );

  const handleCharacterToggleWithPageReset = useCallback(
    (value: string) => {
      handleCharacterToggle(value);
      setPage(1);
    },
    [handleCharacterToggle],
  );

  return (
    <>
      <Filters
        characterOptions={characterOptions}
        filters={filters}
        handleFilterChange={handleFilterChangeWithPageReset}
        handleCharacterToggle={handleCharacterToggleWithPageReset}
      />

      <AnimalSearchResults
        isLoading={isLoading}
        error={error}
        animals={searchResults}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
