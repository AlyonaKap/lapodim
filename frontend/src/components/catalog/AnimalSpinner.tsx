import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { AnimalCard } from "@/components/ui/AnimalCard";
import type { DisplayAnimal } from "@/types/animals";

export function AnimalSpinner({ animals }: { animals: DisplayAnimal[] }) {
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
    return Array.from({ length: visibleCount }, (_, i) => {
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

  return (
    <div className="flex items-center justify-center ">
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Попередні тваринки"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full  text-light-yellow transition hover:opacity-90"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className="w-full overflow-hidden">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {visibleAnimals.map((animal, index) => (
            <AnimalCard
              key={`${animal.name}-${index}`}
              name={animal.name}
              imageUrl={animal.imageUrl}
              isNavigationEnabled={false}
              className="w-full"
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Наступні тваринки"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-light-yellow transition "
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-light-yellow" />
      </button>
    </div>
  );
}
