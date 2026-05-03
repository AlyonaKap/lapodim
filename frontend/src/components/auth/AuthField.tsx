import { cn } from "@/utils/cn";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type AuthFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & {
  error?: string;
  label: string;
  registration: UseFormRegisterReturn;
  trailingAction?: ReactNode;
};

export function AuthField({
  className,
  error,
  label,
  registration,
  trailingAction,
  ...props
}: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={registration.name}
        className="text-[20px] leading-none text-dark-blue"
      >
        {label}
      </label>
      <div
        className={cn(
          "flex items-center gap-3 rounded-full border-2 bg-light-yellow px-5 py-3",
          error ? "border-dark-red" : "border-light-yellow",
          className,
        )}
      >
        <input
          id={registration.name}
          className="w-full border-none bg-transparent text-[15px] text-dark-blue placeholder:text-dark-blue/35 focus:outline-none"
          {...registration}
          {...props}
        />
        {trailingAction}
      </div>
    </div>
  );
}
