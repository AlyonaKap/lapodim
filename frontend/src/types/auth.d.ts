export type AuthIntent = "owner" | "adoption" | "curator" | "likes";

export type AuthRouteState = {
  from?: string;
  intent?: AuthIntent;
};

export type AuthUser = {
  email: string;
  name: string;
  surname: string;
  phone: string;
};

export type AuthSession = {
  access: string;
  user: AuthUser;
};

export type UpdateUserPayload = Partial<
  Pick<AuthUser, "email" | "name" | "phone" | "surname">
>;

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
};

export type AuthErrorFields = Partial<
  Record<keyof RegisterCredentials | keyof LoginCredentials, string>
> & {
  form?: string;
};
