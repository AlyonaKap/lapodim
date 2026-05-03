import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import type { FilterOption } from "@/utils/filterConstants";

type CheckboxSelectProps = {
  placeholder: string;
  options: FilterOption[];
  values: string[];
  onChange: (value: string) => void;
};

export function CheckboxSelect({
  placeholder,
  options,
  values,
  onChange,
}: CheckboxSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedCount = values.length;
  const displayLabel =
    selectedCount > 0 ? `${placeholder} (${selectedCount})` : placeholder;

  const handleTriggerClick = (): void => {
    setIsOpen((previousState) => !previousState);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent): void => {
      if (!containerRef.current) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative z-15 min-w-[200px]" ref={containerRef}>
      <Button
        type="button"
        variant="filter"
        size="md"
        onClick={handleTriggerClick}
        className="flex w-full justify-between gap-4"
        aria-expanded={isOpen}
        aria-controls={listboxId}
      >
        <span className="font-medium text-xl">{displayLabel}</span>
        <FontAwesomeIcon
          className={cn(
            "transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          )}
          icon={faChevronDown}
        />
      </Button>

      {isOpen && (
        <div
          id={listboxId}
          role="group"
          aria-label={placeholder}
          className="absolute left-0 top-[calc(100%+12px)] z-15 flex w-full flex-col gap-3 rounded-[26px] border-4 border-white bg-foreground px-4 py-5 shadow-lg"
        >
          {options.map((option) => {
            const isSelected = values.includes(option.value);

            return (
              <button
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                key={option.value}
                className="group flex cursor-pointer select-none items-center justify-between border-none bg-transparent p-0 text-left"
                onClick={() => onChange(option.value)}
              >
                <span className="text-xl text-white transition-opacity group-hover:opacity-80">
                  {option.label}
                </span>

                <div
                  className={cn(
                    "flex h-[22px] w-[22px] items-center justify-center rounded-md border-[2.5px] border-white transition-all",
                    isSelected ? "bg-white" : "bg-transparent",
                  )}
                >
                  {isSelected && (
                    <svg
                      className="h-3 w-3 text-light-blue"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
