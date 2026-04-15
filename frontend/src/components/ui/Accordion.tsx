import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface AccordionItem {
    question: string;
    answer: string;
}

interface AccordionProps {
    items: AccordionItem[];
    className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`flex flex-col gap-11 w-full ${className}`}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className="flex flex-col w-full"
                    >
                        <button
                            onClick={() => toggle(index)}
                            className={`
                                w-full flex items-center justify-between gap-10 text-white
                                px-6 py-4 text-left cursor-pointer relative z-10
                                transition-all duration-300 bg-foreground border-4 border-white rounded-full
                                ${isOpen ? "shadow-lg" : ""}
                            `}
                        >
                            <span className="font-semibold text-md md:text-xl">
                                {item.question}
                            </span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        <div
                            className={`
                                grid transition-all duration-300 ease-in-out bg-light-purple rounded-b-2xl 
                                -mt-7 ${isOpen ? "grid-rows-[1fr] opacity-100 pt-6" : "grid-rows-[0fr] opacity-0 pointer-events-none"}
                            `}
                        >
                            <div className="overflow-hidden">
                                <div className="px-6 pb-5 pt-4">
                                    <div className="max-h-[250px] overflow-y-auto pr-2">
                                        <p className="text-dark-blue text-md md:text-xl ">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}