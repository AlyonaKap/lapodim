import type { Animal } from "@/types/animals";
import { AnimalCard } from "@/components/ui/AnimalCard";

type AnimalSearchResultsProps = {
  isLoading: boolean;
  error: Error | null;
  animals: Animal[];
};

export function AnimalSearchResults({
  isLoading,
  error,
  animals,
}: AnimalSearchResultsProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-10 lg:mt-8 py-4">
      <div className="w-full overflow-hidden">
        {animals?.length === 0 ? (
          <div>No animals found</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {animals?.map((animal, index) => (
              <AnimalCard
                key={`${animal.name}-${index}`}
                name={animal.name}
                imageUrl={animal.image_url}
                animalId={animal.id}
                isNavigationEnabled={true}
                className="w-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
