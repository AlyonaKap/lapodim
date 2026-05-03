let isLogoutInProgress = false;

export function beginLogout(): void {
  isLogoutInProgress = true;
}

export function finishLogout(): void {
  isLogoutInProgress = false;
}

export function isLoggingOut(): boolean {
  return isLogoutInProgress;
}
