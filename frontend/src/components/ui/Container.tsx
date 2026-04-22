import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("w-full max-w-[1280px] mx-auto px-4", className)}>
      {children}
    </div>
  );
}
