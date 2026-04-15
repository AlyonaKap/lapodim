import { cn } from "@/utils/cn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

type LandingCardProps = {
    title: string;
    items: string[];
    variant?: "light" | "dark";
    className?: string;

}

export function LandingCard({ title, items, variant = "light", className }: LandingCardProps) {
    const isDark = variant === "dark";

    return (
        <div className={cn(
            "flex flex-1 flex-col gap-8 p-8 md:p-10 lg:p-12 rounded-[40px] shadow-lg transition-all w-full",
            isDark ? "bg-light-blue text-white" : "bg-primary text-dark-blue",
            className
        )}>
            <h4 className="text-[32px] md:text-4xl font-semibold">{title}</h4>
            <ul className="flex flex-col gap-4">
                {items.map((item, index) => (
                    <li key={index} className={cn(
                        "flex items-start gap-4 text-[22px] py-4 px-4 rounded-[32px]",
                        isDark ? "bg-foreground text-white" : "bg-dark-yellow text-dark-blue"
                    )}>
                        <FontAwesomeIcon
                            icon={faPaw}
                            className={cn("mt-1.5 shrink-0 text-2xl", isDark ? "text-white" : "text-dark-blue")}
                        />
                        <span className="md:px-4">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}