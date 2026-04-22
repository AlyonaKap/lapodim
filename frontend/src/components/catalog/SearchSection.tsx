import { useGetAnimals } from "@/api/queries/animals";
import { useFilters } from "@/hooks/useFilters";
import { useState } from "react";

import { Filters } from "@/components/catalog/Filters";
import { AnimalSearchResults } from "@/components/catalog/AnimalSearchResults";
import { Pagination } from "@/components/catalog/Pagination";

const PAGE_SIZE = 4;

export function SearchSection() {
  const { filters, handleFilterChange } = useFilters();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetAnimals(filters, page, PAGE_SIZE);
  const searchResults = data?.results ?? [];
  const totalPages = data ? Math.max(1, Math.ceil(data.count / PAGE_SIZE)) : 1;

  return (
    <>
      <Filters filters={filters} handleFilterChange={handleFilterChange} />

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
