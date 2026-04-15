import type { ReactNode, HTMLAttributes } from "react";
import Container from "./Container";
import { cn } from "@/utils/cn";

type SectionProps = HTMLAttributes<HTMLElement> & {
    children: ReactNode;
    containerClassName?: string;
}

export default function Section({ children, className, containerClassName, ...props }: SectionProps) {
    return (
        <section className={cn("w-full", className)} {...props}>
            <Container className={containerClassName}>
                {children}
            </Container>
        </section>
    );
}
