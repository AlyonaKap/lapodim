import type { ReactNode, HTMLAttributes } from "react";
import Container from "./Container";
import { cn } from "@/utils/cn";

type SectionProps = HTMLAttributes<HTMLElement> & {
    children: ReactNode;
    containerClassName?: string;
    withBottomBelly?: boolean;
}

export default function Section({ children, className, containerClassName, withBottomBelly = false, ...props }: SectionProps) {
    return (
        <section className={cn("w-full relative", className)} {...props}>
            <Container className={containerClassName}>
                {children}
            </Container>
            {withBottomBelly && (
                <div className="absolute left-0 bottom-[-1px] w-full overflow-hidden leading-0 pointer-events-none flex">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[30px] md:h-[60px] block">
                        <path d="M 0 0 C 480 80 960 80 1440 0 V 60 H 0 Z" fill="#fffbeb" />
                    </svg>
                </div>
            )}
        </section>
    );
}
