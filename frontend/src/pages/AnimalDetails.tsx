import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Section from "@/components/ui/Section";
import { Footer } from "@/components/ui/Footer";
import { useGetAnimalById } from "@/api/queries/animals";
import { Button } from "@/components/ui/Button";
import { HelpAnimalModal } from "@/components/animal/HelpAnimalModal";
import { AnimalDetailsFallback } from "@/components/animal/AnimalDetailsFallback";
import { BackIcon } from "@/components/icons/BackIcon";
import { HeartIcon } from "@/components/icons/HeartIcon";
import {
  getAnimalMetaLine,
  getCharacteristicItems,
  getAnimalDescription,
} from "@/utils/animalUtils";

export default function AnimalDetails() {
  const { animalId } = useParams();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const parsedAnimalId = useMemo(() => {
    if (!animalId) {
      return null;
    }

    const nextAnimalId = Number(animalId);
    return Number.isInteger(nextAnimalId) && nextAnimalId > 0
      ? nextAnimalId
      : null;
  }, [animalId]);

  const {
    data: animal,
    isLoading,
    error,
  } = useGetAnimalById(parsedAnimalId ?? 0, parsedAnimalId !== null);

  if (parsedAnimalId === null) {
    return (
      <AnimalDetailsFallback
        title="Некоректна картка тваринки"
        description="Ця сторінка не містить коректного ідентифікатора. Поверніться до каталогу та оберіть доступний профіль."
      />
    );
  }

  if (isLoading) {
    return (
      <AnimalDetailsFallback
        title="Завантажуємо профіль"
        description="Отримуємо інформацію про обрану тваринку."
      />
    );
  }

  if (error || !animal) {
    return (
      <AnimalDetailsFallback
        title="Тваринку не знайдено"
        description="Не вдалося завантажити профіль. Можливо, він тимчасово недоступний або вже видалений."
      />
    );
  }

  const metaLine = getAnimalMetaLine(animal);
  const characteristicItems = getCharacteristicItems(animal);
  const description = getAnimalDescription(animal);

  return (
    <>
      <Section className="bg-background-light px-4 pb-16 pt-24 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[36px] bg-light-blue shadow-[0_24px_60px_rgba(91,126,255,0.24)]">
          <div className="flex items-center justify-between gap-4 px-6 py-5 lg:px-12">
            <Link
              to="/pet-catalog"
              className="inline-flex items-center gap-3 text-xl text-light-yellow transition hover:opacity-85 md:text-2xl"
            >
              <BackIcon />
              <span>Назад</span>
            </Link>

            <button
              type="button"
              className="inline-flex items-center gap-3 text-lg text-light-yellow transition hover:opacity-85 md:text-xl"
            >
              <span className="hidden sm:inline">В обране</span>
              <HeartIcon />
            </button>
          </div>

          <div className="border-t-4 border-dotted border-white/90" />

          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[350px_minmax(0,1fr)] lg:items-start lg:gap-16 lg:px-12 lg:py-10">
            <div className="overflow-hidden rounded-[28px] bg-white/55 shadow-md">
              <img
                src={animal.image_url || "https://cataas.com/cat?type=square"}
                alt={animal.name}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-col gap-5 text-light-yellow lg:pt-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="truncate text-4xl leading-none md:text-5xl lg:text-6xl">
                    {animal.name}
                  </h1>
                  <p className="mt-3 text-2xl text-light-yellow md:text-3xl">
                    {metaLine}
                  </p>
                  <p className="mt-2 text-lg text-light-yellow/80">
                    {animal.animal_type}
                    {" • "}
                    {animal.is_adopted ? "Вже прилаштований" : "Шукає дім"}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => setIsHelpModalOpen(true)}
                className="w-fit"
              >
                Хочу допомогти
              </Button>

              <div>
                <h2 className="text-xl md:text-2xl">Про мене:</h2>
                <div className="mt-4 flex max-w-[540px] flex-wrap gap-3">
                  {characteristicItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-2xl bg-light-purple px-4 py-2 text-xl leading-none text-dark-blue"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <p className="max-w-[620px] text-md text-light-yellow md:text-xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <HelpAnimalModal
        animalName={animal.name}
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      <Footer />
    </>
  );
}
