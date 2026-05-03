import { AdoptionRequestCard } from "@/components/profile/AdoptionRequestCard";
import type { Adoption } from "@/types/animals";
import { Link } from "react-router-dom";

type AdoptionRequestsProps = {
  adoptions: Adoption[];
  isLoading: boolean;
};

export function AdoptionRequests({
  adoptions,
  isLoading,
}: AdoptionRequestsProps) {
  return (
    <section className="rounded-[22px] bg-primary px-5 py-5 shadow-lg md:px-7">
      <h2 className="mb-4 w-fit rounded-full bg-light-yellow px-5 py-1 text-[15px] text-dark-blue">
        Мої заявки на адопцію
      </h2>

      {isLoading ? (
        <p className="rounded-[12px] bg-background-light p-4 text-[16px] text-dark-blue">
          Завантажуємо заявки...
        </p>
      ) : null}

      {!isLoading && adoptions.length === 0 ? (
        <div className="rounded-[12px] bg-background-light p-4 text-dark-blue">
          <p className="text-[18px]">У вас ще немає активних адопцій</p>
          <Link
            to="/pet-catalog/"
            className="mt-4 inline-flex w-fit rounded-full bg-dark-yellow px-4 py-1 text-[15px] text-dark-blue transition hover:brightness-95"
          >
            Перейти до каталогу
          </Link>
        </div>
      ) : null}

      {!isLoading && adoptions.length > 0 ? (
        <div className="flex max-h-[350px] flex-col gap-3 overflow-y-auto pr-2">
          {adoptions.map((adoption) => (
            <AdoptionRequestCard key={adoption.id} adoption={adoption} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
