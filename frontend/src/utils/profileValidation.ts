import type { UpdateUserPayload } from "@/types/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9()\-\s]{10,20}$/;

export function getProfileFieldError(
  field: keyof UpdateUserPayload,
  value: string,
): string | null {
  const trimmedValue = value.trim();

  if ((field === "name" || field === "surname") && trimmedValue.length === 0) {
    return field === "name" ? "Введіть ім'я" : "Введіть прізвище";
  }

  if (field === "email") {
    if (trimmedValue.length === 0) {
      return "Введіть електронну пошту";
    }

    if (!EMAIL_PATTERN.test(trimmedValue)) {
      return "Введіть коректну електронну пошту";
    }
  }

  if (field === "phone" && trimmedValue.length > 0 && !PHONE_PATTERN.test(trimmedValue)) {
    return "Введіть коректний номер телефону";
  }

  return null;
}
