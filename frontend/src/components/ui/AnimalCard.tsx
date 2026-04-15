import { cn } from "@/utils/cn";

export interface AnimalCardProps {
    name: string;
    imageUrl: string;
    className?: string;
}

export function AnimalCard({ name, imageUrl, className }: AnimalCardProps) {
    return (
        <div className={cn("bg-primary rounded-[32px] p-4 relative flex flex-col gap-3 w-[300px] shadow-lg", className)}>
            <div className="absolute top-7 left-1 right-1 border-t-4 border-dotted border-white/80"></div>

            <div className="mt-8 w-full aspect-square rounded-[24px] overflow-hidden bg-white/20">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="bg-primary-dark text-white px-8 py-1 rounded-full text-2xl text-center font-medium tracking-wide whitespace-nowrap">
                {name}
            </div>
        </div>
    );
}
