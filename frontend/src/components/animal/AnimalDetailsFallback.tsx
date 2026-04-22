import { Link } from "react-router-dom";
import Section from "@/components/ui/Section";
import { Footer } from "@/components/ui/Footer";
import { BackIcon } from "@/components/icons/BackIcon";

export function AnimalDetailsFallback({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <Section className="bg-background-light px-4 pb-16 pt-24 lg:px-6 lg:pt-28">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[36px] bg-light-blue shadow-[0_24px_60px_rgba(91,126,255,0.24)]">
          <div className="flex items-center justify-between gap-4 px-6 py-5 lg:px-12">
            <Link
              to="/pet-catalog"
              className="inline-flex items-center gap-3 text-xl text-light-yellow transition hover:opacity-85 md:text-2xl"
            >
              <BackIcon />
              <span>Назад</span>
            </Link>

            <span className="text-base text-dark-blue/80 md:text-lg">
              Профіль тваринки
            </span>
          </div>

          <div className="border-t-4 border-dotted border-white/90" />

          <div className="px-6 py-10 lg:px-12 lg:py-12">
            <h1 className="text-3xl text-light-yellow md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-xl leading-relaxed text-light-yellow md:text-2xl">
              {description}
            </p>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
