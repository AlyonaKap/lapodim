import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { AnimalCard } from "@/components/ui/AnimalCard";
import type { Animal } from "@/types/animals";
import { cn } from "@/utils/cn";

type AnimalSpinnerProps = {
  animals: Animal[];
  controlClassName?: string;
};

export function AnimalSpinner({ animals, controlClassName }: AnimalSpinnerProps) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 800 ? 1 : 4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleAnimals = useMemo(() => {
    if (animals.length === 0) return [];

    return Array.from({ length: Math.min(visibleCount, animals.length) }, (_, i) => {
      const index = (startIndex + i) % animals.length;
      return animals[index];
    });
  }, [startIndex, visibleCount, animals]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? animals.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % animals.length);
  };

  if (animals.length === 0) {
    return (
      <div className="px-4 lg:px-12 text-light-yellow/70 text-xl">
        Наразі немає рекомендацій
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center ">
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Попередні тваринки"
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-light-yellow transition hover:opacity-90",
          controlClassName,
        )}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className="w-full overflow-hidden">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {visibleAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              name={animal.name}
              imageUrl={animal.image_url}
              animalId={animal.id}
              isNavigationEnabled={true}
              className="w-full"
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Наступні тваринки"
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full cursor-pointer text-light-yellow transition hover:opacity-90",
          controlClassName,
        )}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
