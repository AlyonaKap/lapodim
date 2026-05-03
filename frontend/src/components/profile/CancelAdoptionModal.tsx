import { useEffect, useRef, type MouseEvent } from "react";

type CancelAdoptionModalProps = {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function CancelAdoptionModal({
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: CancelAdoptionModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if (!dialogElement) {
      return;
    }

    if (isOpen && !dialogElement.open) {
      dialogElement.showModal();
      return;
    }

    if (!isOpen && dialogElement.open) {
      dialogElement.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if (!dialogElement) {
      return;
    }

    const handleClose = (): void => {
      onClose();
    };

    dialogElement.addEventListener("close", handleClose);

    return () => {
      dialogElement.removeEventListener("close", handleClose);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>): void => {
    if (event.target !== event.currentTarget) {
      return;
    }

    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="m-auto w-[min(488px,calc(100%-32px))] rounded-[24px] border-none bg-transparent p-0 backdrop:bg-dark-blue/30"
      aria-labelledby="cancel-adoption-title"
    >
      <div className="relative rounded-[24px] bg-primary px-9 pb-10 pt-12 text-dark-blue">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="absolute right-6 top-4 cursor-pointer text-[30px] leading-none transition hover:opacity-70"
          aria-label="Закрити"
        >
          ×
        </button>

        <div className="rounded-[34px] bg-white px-8 py-11 text-center">
          <h2 id="cancel-adoption-title" className="text-[30px] leading-tight">
            Ви дійсно бажаєте скасувати адопцію?
          </h2>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="mt-9 min-w-[232px] cursor-pointer rounded-full bg-light-red px-4 py-2 text-[20px] font-bold text-light-yellow transition hover:brightness-95 disabled:pointer-events-none disabled:opacity-70"
          >
            {isDeleting ? "Скасовуємо..." : "Скасувати"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
