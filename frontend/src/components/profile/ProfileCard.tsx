import { EditableProfileField } from "@/components/profile/EditableProfileField";
import { Button } from "@/components/ui/Button";
import { useProfileForm } from "@/hooks/useProfileForm";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useLogout";
import type { AuthUser } from "@/types/auth";

export function ProfileCard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="rounded-[22px] bg-light-blue px-8 py-8 text-xl text-light-yellow shadow-lg">
        Завантажуємо профіль...
      </section>
    );
  }

  return <ProfileCardContent user={user} />;
}

function ProfileCardContent({ user }: { user: AuthUser }) {
  const logout = useLogout();
  const {
    editingField,
    errors,
    handleChange,
    isSaving,
    saveField,
    setEditingField,
    values,
  } = useProfileForm(user);

  return (
    <section className="flex h-fit flex-col items-start rounded-[22px] bg-light-blue px-5 py-6 text-light-yellow shadow-lg md:px-8">
      <h2 className="mb-4 self-start w-fit rounded-full bg-light-yellow px-5 py-1 text-[15px] text-dark-blue">
        Про мене
      </h2>
      <div className="flex w-full gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-light-yellow">
          <img
            src="/avatar.svg"
            alt="Аватар профілю"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <EditableProfileField
            label="ім'я"
            value={values.name ?? ""}
            placeholder="Ім'я"
            isEditing={editingField === "name"}
            isSaving={isSaving}
            error={errors.name}
            onEdit={() => setEditingField("name")}
            onChange={(value) => handleChange("name", value)}
            onSave={() => void saveField("name")}
          />
          <EditableProfileField
            label="прізвище"
            value={values.surname ?? ""}
            placeholder="Прізвище"
            isEditing={editingField === "surname"}
            isSaving={isSaving}
            error={errors.surname}
            onEdit={() => setEditingField("surname")}
            onChange={(value) => handleChange("surname", value)}
            onSave={() => void saveField("surname")}
          />
        </div>
      </div>

      <div className="mt-4 flex w-full flex-col gap-3">
        <EditableProfileField
          label="email"
          value={values.email ?? ""}
          placeholder="email@example.com"
          type="email"
          isEditing={editingField === "email"}
          isSaving={isSaving}
          error={errors.email}
          onEdit={() => setEditingField("email")}
          onChange={(value) => handleChange("email", value)}
          onSave={() => void saveField("email")}
        />
        <EditableProfileField
          label="телефон"
          value={values.phone ?? ""}
          placeholder="Введіть телефон"
          type="tel"
          isEditing={editingField === "phone"}
          isSaving={isSaving}
          error={errors.phone}
          onEdit={() => setEditingField("phone")}
          onChange={(value) => handleChange("phone", value)}
          onSave={() => void saveField("phone")}
        />
      </div>

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => void logout()}
        className="mt-4 rounded-[8px] px-4 py-1 text-[15px] bg-foreground"
      >
        Вийти
      </Button>
    </section>
  );
}
