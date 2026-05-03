import { useGetAnimals } from "@/api/queries/animals";
import { AnimalSpinner } from "@/components/catalog/AnimalSpinner";
import { SearchSection } from "@/components/catalog/SearchSection";
import { Footer } from "@/components/ui/Footer";
import Section from "@/components/ui/Section";
import { useAuth } from "@/hooks/useAuth";

const EMPTY_FILTERS = {
  search: "",
  size: "",
  gender: "",
  age: "",
  animal_type: "",
  character: [] as string[],
};

export default function PetCatalog() {
  const { user } = useAuth();
  const recommendationTitle = user?.name
    ? `${user.name}, придивіться до цих тваринок:`
    : "Придивіться до цих тваринок:";

  const { data: recommendedData, isLoading: isRecommendedLoading } =
    useGetAnimals(EMPTY_FILTERS, 1, 8);

  const recommendedAnimals = recommendedData?.results ?? [];

  return (
    <>
      <Section className="bg-foreground pb-26 pt-5 lg:pt-32" withBottomBelly>
        <div className="px-4 lg:px-12">
          <h4 className="mb-3 w-fit rounded-full bg-dark-yellow px-4 py-1 text-xl text-light-yellow">
            Персоналізований підбір
          </h4>

          <p className="mb-10 text-3xl text-light-yellow">
            {recommendationTitle}
          </p>
        </div>

        {isRecommendedLoading ? (
          <div className="px-4 text-xl text-light-yellow/70 lg:px-12">
            Завантажуємо рекомендації...
          </div>
        ) : (
          <AnimalSpinner animals={recommendedAnimals} />
        )}
      </Section>

      <Section
        className="bg-background-light pb-5 pt-12 lg:pt-15"
        withBottomBelly
      >
        <div>
          <h4 className="mb-3 w-fit rounded-full bg-dark-yellow px-4 py-1 text-xl text-light-yellow">
            Всі хвостаті друзі
          </h4>
        </div>

        <SearchSection />
      </Section>

      <Footer />
    </>
  );
}
