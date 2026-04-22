import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

type AnimalCardBaseProps = {
    name: string;
    imageUrl: string | null;
    className?: string;
};

type StaticAnimalCardProps = AnimalCardBaseProps & {
    isNavigationEnabled: false;
};

type NavigableAnimalCardProps = AnimalCardBaseProps & {
    isNavigationEnabled: true;
    animalId: number;
};

export type AnimalCardProps = StaticAnimalCardProps | NavigableAnimalCardProps;

function AnimalCardContent({
    name,
    imageUrl,
    className,
    isInteractive,
}: AnimalCardBaseProps & { isInteractive: boolean }) {
    return (
        <div
            className={cn(
                "bg-primary rounded-[32px] p-4 relative flex flex-col gap-3 w-[300px] shadow-lg transition-transform",
                isInteractive && "cursor-pointer hover:-translate-y-1",
                className,
            )}
        >
            <div className="absolute top-7 left-1 right-1 border-t-4 border-dotted border-white/80"></div>

            <div className="mt-8 w-full aspect-square rounded-[24px] overflow-hidden bg-white/20">
                <img
                    src={imageUrl || "https://cataas.com/cat?type=square"}
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

export function AnimalCard(props: AnimalCardProps) {
    if (props.isNavigationEnabled) {
        return (
            <Link
                to={`/pet-catalog/${props.animalId}`}
                aria-label={`Відкрити сторінку ${props.name}`}
                className="block rounded-[32px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-light-yellow/60"
            >
                <AnimalCardContent
                    name={props.name}
                    imageUrl={props.imageUrl}
                    className={props.className}
                    isInteractive={true}
                />
            </Link>
        );
    }

    return (
        <AnimalCardContent
            name={props.name}
            imageUrl={props.imageUrl}
            className={props.className}
            isInteractive={false}
        />
    );
}
