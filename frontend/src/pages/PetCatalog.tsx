import Section from "@/components/ui/Section";
import type { DisplayAnimal } from "@/types/animals";
import { AnimalSpinner } from "@/components/catalog/AnimalSpinner";
import { SearchSection } from "@/components/catalog/SearchSection";
import { Footer } from "@/components/ui/Footer";

const animals: DisplayAnimal[] = [
  { name: "Тваринка 1", imageUrl: "https://cataas.com/cat?type=square&v=1" },
  { name: "Тваринка 2", imageUrl: "https://cataas.com/cat?type=square&v=2" },
  { name: "Тваринка 3", imageUrl: "https://cataas.com/cat?type=square&v=3" },
  { name: "Тваринка 4", imageUrl: "https://cataas.com/cat?type=square&v=4" },
  { name: "Тваринка 5", imageUrl: "https://cataas.com/cat?type=square&v=5" },
  { name: "Тваринка 6", imageUrl: "https://cataas.com/cat?type=square&v=6" },
];

export default function PetCatalog() {
  const name = "Alena";

  return (
    <>
      <Section className="bg-foreground pb-26 pt-20 lg:pt-32" withBottomBelly>
        <div className="px-4 lg:px-12">
          <h4 className="mb-3 w-fit rounded-full bg-dark-yellow px-4 py-1 text-xl text-light-yellow">
            Персоналізований підбір
          </h4>

          <p className="mb-8 text-3xl text-light-yellow">
            {name}, придивіться до цих тваринок:
          </p>
        </div>

        <AnimalSpinner animals={animals} />
      </Section>

      <Section
        className="bg-background-light pb-26 pt-20 lg:pt-32"
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
