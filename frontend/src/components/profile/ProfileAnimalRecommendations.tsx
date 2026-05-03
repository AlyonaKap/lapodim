import { AnimalSpinner } from "@/components/catalog/AnimalSpinner";
import type { Animal } from "@/types/animals";

type ProfileAnimalRecommendationsProps = {
  animals: Animal[];
  isLoading: boolean;
};

export function ProfileAnimalRecommendations({
  animals,
  isLoading,
}: ProfileAnimalRecommendationsProps) {
  return (
    <section className="rounded-[22px] bg-light-purple px-5 py-6 pb-9 shadow-lg md:px-7">
      <h2 className="mb-6 w-fit rounded-full bg-foreground px-6 py-1 text-[15px] text-light-yellow">
        Мої тваринки
      </h2>

      {isLoading ? (
        <p className="px-4 text-xl text-dark-blue">Завантажуємо тваринок...</p>
      ) : (
        <AnimalSpinner
          animals={animals}
          controlClassName="text-foreground hover:text-blue"
        />
      )}
    </section>
  );
}
