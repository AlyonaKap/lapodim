import { useEffect, useRef, type MouseEvent } from "react";
import { Button } from "@/components/ui/Button";

type HelpAnimalModalProps = {
  animalName: string;
  isOpen: boolean;
  onClose: () => void;
};

export function HelpAnimalModal({ isOpen, onClose }: HelpAnimalModalProps) {
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
      className="m-auto w-[min(960px,calc(100%-32px))] max-w-[960px] rounded-[40px] border-none bg-transparent p-0 text-left backdrop:bg-dark-blue/45 backdrop:backdrop-blur-[2px]"
      aria-labelledby="help-animal-modal-title"
    >
      <div className="relative rounded-5xl bg-primary p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[34px] bg-white px-8 py-9 text-dark-blue">
            <h3 className="max-w-[320px] text-3xl ">
              Бажаєте подарувати тваринці дім?
            </h3>
            <p className="mt-5 max-w-[340px] text-xl">
              Наші волонтери зв&apos;яжуться з вами як тільки ми отримаємо
              заявку
            </p>
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => {}}
              className="mt-10 min-w-[238px] justify-center"
            >
              Забрати додому
            </Button>
          </article>

          <article className="rounded-[34px] bg-white px-8 py-9 text-dark-blue">
            <h3 className="max-w-[320px] text-3xl">Бажаєте стати куратором?</h3>
            <p className="mt-5 max-w-[340px] text-xl">
              Ви можете оформити щомісячну підписку на корм і догляд за
              тваринкою
            </p>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => {}}
              className="mt-10 min-w-[238px] justify-center bg-foreground"
            >
              Стати куратором
            </Button>
          </article>
        </div>
      </div>
    </dialog>
  );
}
