import { useState } from "react";
import { useDeleteAdoption } from "@/api/queries/animals";
import { CancelAdoptionModal } from "@/components/profile/CancelAdoptionModal";
import type { Adoption, AdoptionStatus } from "@/types/animals";
import { Link } from "react-router-dom";

type AdoptionRequestCardProps = {
  adoption: Adoption;
};

const statusLabels: Record<AdoptionStatus, string> = {
  pending: "Отримана",
  approved: "Схвалена",
  rejected: "Відхилена",
};

function formatCreatedAt(createdAt: string): string {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(createdAt));
}

export function AdoptionRequestCard({ adoption }: AdoptionRequestCardProps) {
  const { animal } = adoption;
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const deleteAdoption = useDeleteAdoption();

  const handleConfirmCancel = async (): Promise<void> => {
    await deleteAdoption.mutateAsync(adoption.id);
    setIsCancelModalOpen(false);
  };

  return (
    <>
      <article className="grid grid-cols-[82px_1fr] gap-4 rounded-[12px] bg-background-light p-3 text-dark-blue shadow-sm">
        <img
          src={animal.image_url || "https://cataas.com/cat?type=square"}
          alt={animal.name}
          className="h-[82px] w-[82px] rounded-[12px] object-cover"
        />
        <div className="flex min-w-0 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[20px] leading-none">{animal.name}</h3>
              <p className="mt-2 text-[15px] leading-none">
                Дата подачі: {formatCreatedAt(adoption.created_at)}
              </p>
            </div>
            <span className="px-4 py-1 text-[15px] text-dark-blue">
              {statusLabels[adoption.status]}
            </span>
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            <Link
              to={`/pet-catalog/${animal.id}`}
              className="w-fit rounded-full bg-dark-yellow px-4 py-1 text-[15px] text-dark-blue transition hover:brightness-95"
            >
              Про тварину
            </Link>
            <button
              type="button"
              onClick={() => setIsCancelModalOpen(true)}
              className="w-fit cursor-pointer rounded-full bg-light-red px-6 py-1 text-[15px] font-bold text-light-yellow transition hover:brightness-95"
            >
              Скасувати
            </button>
          </div>
        </div>
      </article>

      <CancelAdoptionModal
        isOpen={isCancelModalOpen}
        isDeleting={deleteAdoption.isPending}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => void handleConfirmCancel()}
      />
    </>
  );
}
