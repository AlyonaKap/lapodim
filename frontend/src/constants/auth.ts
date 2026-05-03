import type { AuthIntent } from "@/types/auth";

export const AUTH_USER_STORAGE_KEY = "lapodim.auth.user";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";

const AUTH_INTENT_MESSAGES: Record<AuthIntent, string> = {
  owner: "Увійдіть у акаунт, щоб стати господарем",
  adoption: "Увійдіть у акаунт, щоб забрати тваринку додому",
  curator: "Увійдіть у акаунт, щоб стати куратором",
  likes: "Увійдіть у акаунт, щоб зберігати вподобання",
};

export function getAuthIntentMessage(intent?: AuthIntent): string {
  if (!intent) {
    return "Увійдіть у акаунт, щоб продовжити";
  }

  return AUTH_INTENT_MESSAGES[intent];
}
