let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setMemoryAccessToken(token: string | null): void {
  accessToken = token;
}
