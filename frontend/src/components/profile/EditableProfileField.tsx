import type { KeyboardEvent } from "react";

type EditableProfileFieldProps = {
  error?: string;
  isEditing: boolean;
  isSaving: boolean;
  label: string;
  onChange: (value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  placeholder: string;
  type?: "email" | "tel" | "text";
  value: string;
};

export function EditableProfileField({
  error,
  isEditing,
  isSaving,
  label,
  onChange,
  onEdit,
  onSave,
  placeholder,
  type = "text",
  value,
}: EditableProfileFieldProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col gap-1">
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onSave}
          onKeyDown={handleKeyDown}
          disabled={isSaving}
          placeholder={placeholder}
          className="w-full rounded-[10px] bg-light-yellow px-4 py-2 text-[16px] text-dark-blue outline-none ring-2 ring-transparent transition focus:ring-foreground"
          autoFocus
        />
        <span className="min-h-4 text-[13px] leading-none text-dark-red">
          {error ?? ""}
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onEdit}
      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[10px] bg-light-yellow px-4 py-2 text-left text-[16px] text-dark-blue transition hover:brightness-95"
    >
      <span className={value ? "" : "text-dark-blue/55"}>
        {value || placeholder}
      </span>
      <span className="shrink-0 text-[18px]" aria-label={`Редагувати ${label}`}>
        ✎
      </span>
    </button>
  );
}
