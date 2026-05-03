import { updateCurrentUser } from "@/api/services/user";
import { useAuth } from "@/hooks/useAuth";
import type { AuthUser, UpdateUserPayload } from "@/types/auth";
import { getProfileFieldError } from "@/utils/profileValidation";
import { useState } from "react";

type EditableField = keyof UpdateUserPayload;
type ProfileFormValues = Pick<AuthUser, "email" | "name" | "phone" | "surname">;

const PROFILE_FIELDS: EditableField[] = ["name", "surname", "email", "phone"];

function getInitialValues(user: AuthUser): ProfileFormValues {
  return {
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
  };
}

export function useProfileForm(user: AuthUser) {
  const { setUser } = useAuth();
  const [values, setValues] = useState<ProfileFormValues>(() =>
    getInitialValues(user),
  );
  const [errors, setErrors] = useState<Partial<Record<EditableField, string>>>(
    {},
  );
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: EditableField, value: string): void => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const saveField = async (field: EditableField): Promise<void> => {
    const value = values[field] ?? "";
    const error = getProfileFieldError(field, value);

    if (error) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: error,
      }));
      return;
    }

    if (user[field] === value.trim()) {
      setEditingField(null);
      return;
    }

    setIsSaving(true);

    try {
      const updatedUser = await updateCurrentUser({
        [field]: value.trim(),
      });
      setUser(updatedUser);
      setEditingField(null);
    } catch {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: "Не вдалося зберегти зміни",
      }));
    } finally {
      setIsSaving(false);
    }
  };

  const saveAll = async (): Promise<boolean> => {
    const nextErrors: Partial<Record<EditableField, string>> = {};

    for (const field of PROFILE_FIELDS) {
      const error = getProfileFieldError(field, values[field] ?? "");

      if (error) {
        nextErrors[field] = error;
      }
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return false;
    }

    setIsSaving(true);

    try {
      const updatedUser = await updateCurrentUser({
        name: values.name.trim(),
        surname: values.surname.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      });
      setUser(updatedUser);
      setEditingField(null);
      return true;
    } catch {
      setErrors({
        email: "Не вдалося зберегти профіль",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    editingField,
    errors,
    isSaving,
    values,
    handleChange,
    saveAll,
    saveField,
    setEditingField,
  };
}
