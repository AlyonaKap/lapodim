import type { Animal } from "@/types/animals";

const genderLabels: Record<string, string> = {
  boy: "Хлопчик",
  girl: "Дівчинка",
};

const sizeLabels: Record<string, string> = {
  small: "Малий",
  medium: "Середній",
  large: "Великий",
};

export function formatYearsLabel(years: number): string {
  const roundedYears = Math.max(0, Math.round(years));

  if (roundedYears % 10 === 1 && roundedYears % 100 !== 11) {
    return `${roundedYears} рік`;
  }

  if (
    roundedYears % 10 >= 2 &&
    roundedYears % 10 <= 4 &&
    (roundedYears % 100 < 12 || roundedYears % 100 > 14)
  ) {
    return `${roundedYears} роки`;
  }

  return `${roundedYears} років`;
}

export function formatAnimalAge(age: Animal["age"]): string {
  if (typeof age === "number") {
    return formatYearsLabel(age);
  }

  const parsedDate = new Date(age);
  if (Number.isNaN(parsedDate.getTime())) {
    return String(age);
  }

  const currentDate = new Date();
  let years = currentDate.getFullYear() - parsedDate.getFullYear();
  const hasBirthdayPassed =
    currentDate.getMonth() > parsedDate.getMonth() ||
    (currentDate.getMonth() === parsedDate.getMonth() &&
      currentDate.getDate() >= parsedDate.getDate());

  if (!hasBirthdayPassed) {
    years -= 1;
  }

  return formatYearsLabel(years);
}

export function getAnimalMetaLine(animal: Animal): string {
  const genderLabel = genderLabels[animal.gender] || animal.gender;
  const ageLabel = formatAnimalAge(animal.age);

  return `${genderLabel}, ${ageLabel}`;
}

export function getCharacteristicItems(animal: Animal): string[] {
  const sizeLabel = sizeLabels[animal.size] || animal.size;
  return [sizeLabel, ...animal.characters];
}

export function getAnimalDescription(animal: Animal): string {
  const trimmedDescription = animal.description.trim();

  if (trimmedDescription.length > 0) {
    return trimmedDescription;
  }

  return "Я чекаю на людину, яка подарує мені турботу, тепло та дім.";
}
