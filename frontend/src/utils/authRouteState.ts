import type { AuthRouteState } from "@/types/auth";

export function getAuthRouteState(state: unknown): AuthRouteState {
  if (!state || typeof state !== "object") {
    return {};
  }

  const routeState = state as Record<string, unknown>;

  return {
    from: typeof routeState.from === "string" ? routeState.from : undefined,
    intent:
      routeState.intent === "owner" ||
      routeState.intent === "adoption" ||
      routeState.intent === "curator" ||
      routeState.intent === "likes"
        ? routeState.intent
        : undefined,
  };
}
