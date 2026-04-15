import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

type InfoCardProps = {
    title: string;
    children: ReactNode;
    className?: string;
};

export function InfoCard({ title, children, className }: InfoCardProps) {
    return (
        <div className={cn(
            "flex flex-col items-start gap-4 text-[22px] p-12 rounded-[60px] bg-dark-yellow text-dark-blue",
            className
        )}>
            <span className="text-3xl text-dark-blue flex gap-1">
                <FontAwesomeIcon
                    icon={faPaw}
                    className="mt-1 shrink-0"
                />
                {title}
            </span>
            <span className="md:px-4 text-xl">
                {children}
            </span>
        </div>
    );
}
