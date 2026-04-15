import Section from "@/components/ui/Section";
import { InfoCard } from "@/components/landing/InfoCard";
import { Footer } from "@/components/ui/Footer";

export default function AboutUs() {
    return (
        <>
            <Section className="mt-20 lg:mt-32 bg-light-purple rounded-[60px] shadow-lg">
                <div className="rounded-[60px] px-6 lg:px-12">
                    <div className="flex flex-row gap-16 pt-1 pb-12 justify-between items-center">
                        <div className="space-y-5 max-w-[600px]">
                            <h1 className="text-5xl text-dark-blue">Про нас</h1>
                            <p className="text-xl text-dark-blue leading-relaxed">
                                Наш притулок - це місце турботи та любові для тварин,
                                які опинилися без дому. Ми щодня піклуємося про їхнє здоров'я,
                                харчування та соціалізацію, щоб кожен з них мав шанс знайти свою родину.
                                У притулку проживають лапки різного віку й характеру, і кожен з них мріє
                                про тепло та дім
                            </p>
                        </div>
                        <div className="hidden md:block h-90 w-90 min-w-90 rotate-6 rounded-4xl border-16 border-light-yellow shadow-lg">
                            <img src="https://cataas.com/cat?1" alt="a pet from our shelter" className="w-full h-full object-cover rounded-2xl" />
                        </div>
                    </div>
                </div>

                <div className="text-light-yellow p-5 bg-foreground rounded-4xl border-3 border-light-yellow grid grid-rows-3 md:grid-rows-1 lg:grid-cols-3 mx-4 lg:mx-10">
                    <div className="flex flex-col items-center px-4">
                        <p className="text-xl font-medium">Можете зв'язатися</p>
                        <a href="mailto:lapodim_shelter@gmail.com" className="text-lg">lapodim_shelter@gmail.com</a>
                    </div>
                    <div className="flex flex-col items-center px-4 border-x-3 border-light-yellow">
                        <p className="text-xl font-medium">Маєте питання?</p>
                        <a href="tel:+380675609876" className="text-xl">+38 067 560 98 76</a>
                    </div>
                    <div className="flex flex-col items-center px-4">
                        <p className="text-xl font-medium">Використовуй наш <br /> застосунок</p>
                    </div>
                </div>
            </Section>

            <Section className="my-20 lg:mt-32">
                <div className="px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-8 pt-1">
                        <div className="flex flex-col gap-6 w-full lg:w-1/2 justify-center">
                            <InfoCard title="Адреса">
                                {`Притулок "Лаподім"`}
                                <address className="not-italic">
                                    м. Київ, вул. Київська, буд. 2,
                                    Київська область, 01001, Україна
                                </address>
                            </InfoCard>
                            <InfoCard title="Можете відвідати">
                                З 11:00 по 18:00
                            </InfoCard>
                        </div>
                        <div className="w-full lg:w-1/2 h-[300px] lg:h-auto min-h-[300px] rounded-[60px] overflow-hidden shadow-md">
                            <iframe
                                title="Притулок Лаподім на карті"
                                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Kyiv,Ukraine&zoom=14"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </Section >

            <Footer />
        </>
    );
}