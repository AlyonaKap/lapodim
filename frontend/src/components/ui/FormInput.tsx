import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { Input, type InputProps } from "./Input";

export interface FormInputProps<TFieldValues extends FieldValues>
    extends Omit<InputProps, "name"> {
    name: Path<TFieldValues>;
    control: Control<TFieldValues>;
}

export function FormInput<TFieldValues extends FieldValues>({
    name,
    control,
    ...props
}: FormInputProps<TFieldValues>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref, name: fieldName }, fieldState: { error } }) => (
                <Input
                    name={fieldName}
                    value={value || ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    error={error?.message}
                    {...props}
                />
            )}
        />
    );
}
