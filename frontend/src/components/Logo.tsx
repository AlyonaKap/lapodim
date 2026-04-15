import { cn } from "@/utils/cn";

type LogoProps = {
    className?: string;
    textClassName?: string;
}

export function Logo({ className, textClassName }: LogoProps) {
    return (
        <a href="/" className={cn("flex items-center gap-2", className)}>
            <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain" />
            <span className={cn("text-lg font-semibold text-light-yellow", textClassName)}>
                Притулок <br /> Лаподім
            </span>
        </a>
    );
}