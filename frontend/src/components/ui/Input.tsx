import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const inputVariants = cva(
    "flex w-full bg-light-yellow rounded-4xl transition-colors placeholder:text-dark-blue/90 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "text-dark-blue",
            },
            inputSize: {
                sm: "px-3 py-2 text-lg rounded-xl",
                md: "px-4 py-4 text-xl",
                lg: "px-6 py-3 text-xl rounded-[24px]",
            },
        },
        defaultVariants: {
            variant: "default",
            inputSize: "md",
        },
    }
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
    label?: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, inputSize, label, error, id, ...props }, ref) => {
        const generatedId = React.useId();
        const inputId = id || generatedId;

        return (
            <div className="flex flex-col gap-2 w-full">
                {label && (
                    <label htmlFor={inputId} className="text-lg font-medium text-dark-blue px-1">
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    className={cn(inputVariants({ variant, inputSize, className }))}
                    ref={ref}
                    {...props}
                />
                {error && <span className="text-sm font-medium text-red-500 px-1">{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };