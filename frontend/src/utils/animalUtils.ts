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

export function formatMonthsLabel(months: number): string {
  const roundedMonths = Math.max(1, Math.round(months));

  if (roundedMonths % 10 === 1 && roundedMonths % 100 !== 11) {
    return `${roundedMonths} місяць`;
  }

  if (
    roundedMonths % 10 >= 2 &&
    roundedMonths % 10 <= 4 &&
    (roundedMonths % 100 < 12 || roundedMonths % 100 > 14)
  ) {
    return `${roundedMonths} місяці`;
  }

  return `${roundedMonths} місяців`;
}

export function formatAnimalAge(age: Animal["age"]): string {
  if (typeof age === "number") {
    return age < 1 ? formatMonthsLabel(Math.round(age * 12)) : formatYearsLabel(age);
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

  if (years < 1) {
    const totalMonths =
      (currentDate.getFullYear() - parsedDate.getFullYear()) * 12 +
      (currentDate.getMonth() - parsedDate.getMonth());
    return formatMonthsLabel(totalMonths);
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
  return [sizeLabel, ...(animal.characters ?? [])];
}

export function getAnimalDescription(animal: Animal): string {
  const trimmedDescription = animal.description.trim();

  if (trimmedDescription.length > 0) {
    return trimmedDescription;
  }

  return "Я чекаю на людину, яка подарує мені турботу, тепло та дім.";
}
