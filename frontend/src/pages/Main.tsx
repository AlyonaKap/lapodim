import { useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { AnimalCard } from "@/components/ui/AnimalCard";
import { LandingCard } from "@/components/landing/LandingCard";
import ImageSpinner from "@/components/landing/ImageSpinner";
import { Footer } from "@/components/ui/Footer";
import { Accordion } from "@/components/ui/Accordion";

export default function Main() {
    const [fetchedAnimal, setFetchedAnimal] = useState<{name: string, image_url: string} | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/animals/')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setFetchedAnimal(data[0]);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <Section className="bg-foreground px-4 lg:px-18 relative pb-6 pt-16">
                <div className="flex pt-16 pb-20 gap-10 relative z-10">
                    <div className="flex flex-col gap-12 w-full lg:w-1/2">
                        <h2 className="text-[56px] xl:text-5xl font-medium leading-tight text-light-yellow">Ми – 1500 тваринок, які чекають на твоє тепло</h2>
                        <p className="text-[25px] text-light-yellow max-w-[500px] tracking-wide">
                            Ти можеш стати нашим віртуальним господарем або подарувати дім одному з нас
                        </p>
                        <Button variant="secondary" size="lg" className="w-fit">Знайти улюбленця</Button>
                    </div>

                    <div className="hidden lg:flex pt-4 pb-16 justify-center items-center w-full lg:w-1/2 relative">
                        <AnimalCard
                            name={fetchedAnimal ? fetchedAnimal.name : "Тимофій"}
                            imageUrl={fetchedAnimal && fetchedAnimal.image_url ? fetchedAnimal.image_url : "https://cataas.com/cat?type=square"}
                            className="z-20 -rotate-6 translate-y-16 translate-x-2 drop-shadow-md"
                        />
                        <AnimalCard
                            name="Манюня"
                            imageUrl="https://cataas.com/cat/cute"
                            className="z-10 rotate-8 -translate-y-8 -translate-x-4 drop-shadow-2xl"
                        />
                    </div>
                </div>

                <div className="absolute left-0 bottom-[-1px] w-full overflow-hidden leading-0 pointer-events-none flex">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[30px] md:h-[60px] block">
                        <path d="M 0 0 C 480 80 960 80 1440 0 V 60 H 0 Z" fill="#fffbeb" />
                    </svg>
                </div>
            </Section>

            <Section
                className="bg-background-light px-4 lg:px-16 relative py-16"
                containerClassName="flex flex-col lg:flex-row gap-6"
            >
                <LandingCard
                    title="Хочу забрати тваринку додому!"
                    items={[
                        "Заповни коротку анкету для підбору ідеального улюбленця саме для тебе",
                        "Знайди того, з ким у тебе виникне справжній зв'язок",
                        "Натисни \"Забрати улюбленця\" та заповни форму, щоб ми з тобою зв'язалися"
                    ]}
                    variant="light"
                />
                <LandingCard
                    title="Хочу знайти віртуального друга!"
                    items={[
                        "Заповни коротку анкету для підбору ідеального улюбленця саме для тебе",
                        "Обери того, ким бажаєш опікуватися",
                        "Натисни \"Стати куратором\" та оформи щомісячну підтримку на корм і догляд"
                    ]}
                    variant="dark"
                />
            </Section>

            <Section
                className="bg-foreground rounded-[60px] md:rounded-[100px] relative z-10 shadow-[0_20px_25px_rgba(1,34,94,0.3)] mb-[-120px]"
                containerClassName="py-10 md:py-16 lg:py-20"
            >
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-32 w-full">
                    <ImageSpinner />
                    <div className="flex flex-col gap-8 w-full max-w-[500px]">
                        <h3 className="text-4xl md:text-5xl font-medium text-white">
                            Часті питання
                        </h3>

                        <Accordion
                            items={[
                                {
                                    question: "Чи можна відвідати притулок?",
                                    answer: "Так, ви можете прийти до притулку за адресою вул. Київська 2.",
                                },
                                {
                                    question: "Чи потрібні документи для адопції?",
                                    answer: "Для адопції тваринки вам потрібен паспорт та заповнена анкета. Ми також проводимо коротку співбесіду, щоб переконатися, що тваринка потрапить у добрі руки.",
                                },
                                {
                                    question: "Що означає стати куратором?",
                                    answer: "Куратор — це людина, яка щомісяця підтримує утримання тваринки у притулку.",
                                },
                            ]}
                        />
                    </div>
                </div>
            </Section>

            <Footer className="relative pt-[160px]" />
        </>

    );
}
