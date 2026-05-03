import type { FieldValues, Path, UseFormTrigger } from "react-hook-form";

export async function validateSequentialFields<TFormValues extends FieldValues>(
  trigger: UseFormTrigger<TFormValues>,
  fields: Path<TFormValues>[],
): Promise<boolean> {
  for (const field of fields) {
    const isValid = await trigger(field, { shouldFocus: true });

    if (!isValid) {
      return false;
    }
  }

  return true;
}
