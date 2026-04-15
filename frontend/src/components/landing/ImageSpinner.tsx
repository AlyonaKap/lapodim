import { cn } from "@/utils/cn";

export default function ImageSpinner({ className }: { className?: string }) {
    return (
        <div className={cn("relative w-[300px] h-[400px]", className)}>
            <img
                src="https://cataas.com/cat?1"
                alt="Bottom Cat"
                className="w-full h-full absolute top-0 left-0 rounded-[32px] object-cover translate-x-8  rotate-8 shadow-md z-0"
            />
            <img
                src="https://cataas.com/cat/cute?2"
                alt="Middle Cat"
                className="w-full h-full absolute top-0 left-0 rounded-[32px] object-cover -translate-x-8  -rotate-8 shadow-lg z-10"
            />
            <img
                src="https://cataas.com/cat?3"
                alt="Top Cat"
                className="w-full h-full absolute top-0 left-0 rounded-[32px] object-cover shadow-xl z-20"
            />
        </div>
    );
}