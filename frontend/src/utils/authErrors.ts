import axios from "axios";
import type { AuthErrorFields } from "@/types/auth";

function getFirstErrorMessage(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.find((item): item is string => typeof item === "string");
  }

  return undefined;
}

export function getAuthErrorFields(error: unknown): AuthErrorFields {
  if (!axios.isAxiosError(error)) {
    return {
      form: "Не вдалося виконати запит. Спробуйте ще раз.",
    };
  }

  const responseData = error.response?.data;
  const errors = responseData?.errors;

  if (!errors || typeof errors !== "object") {
    return {
      form: "Не вдалося виконати запит. Спробуйте ще раз.",
    };
  }

  const nextErrors: AuthErrorFields = {
    email: getFirstErrorMessage((errors as Record<string, unknown>).email),
    password: getFirstErrorMessage((errors as Record<string, unknown>).password),
    name: getFirstErrorMessage((errors as Record<string, unknown>).name),
    surname: getFirstErrorMessage((errors as Record<string, unknown>).surname),
    phone: getFirstErrorMessage((errors as Record<string, unknown>).phone),
    form:
      getFirstErrorMessage((errors as Record<string, unknown>).error) ??
      getFirstErrorMessage((errors as Record<string, unknown>).detail),
  };

  if (
    nextErrors.form ||
    nextErrors.email ||
    nextErrors.password ||
    nextErrors.name ||
    nextErrors.surname ||
    nextErrors.phone
  ) {
    return nextErrors;
  }

  return {
    form: "Не вдалося виконати запит. Спробуйте ще раз.",
  };
}
