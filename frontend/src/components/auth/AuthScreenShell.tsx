import type { MouseEvent, ReactNode } from "react";

type AuthScreenShellProps = {
  children: ReactNode;
  footer: ReactNode;
  onClose: () => void;
  subtitle: string;
  title: string;
};

export function AuthScreenShell({
  children,
  footer,
  onClose,
  subtitle,
  title,
}: AuthScreenShellProps) {
  const handleBackdropClick = (event: MouseEvent<HTMLElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark-blue/25 px-4 py-10 font-sans backdrop-blur-md"
      onMouseDown={handleBackdropClick}
    >
      <div className="pointer-events-none absolute inset-0 bg-background-light/55 blur-sm" />

      <div className="relative z-10 flex w-full max-w-[520px] flex-col rounded-[32px] bg-primary px-8 py-10 shadow-xl sm:px-11">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-[34px] leading-none cursor-pointer text-dark-blue transition hover:bg-light-yellow/65"
          aria-label="Закрити форму"
        >
          ×
        </button>

        <div className="text-center text-dark-blue">
          <h1 className="text-[30px] leading-[1.1]">{title}</h1>
          <p className="mt-3 text-[15px] leading-[1.35]">{subtitle}</p>
        </div>

        <div className="mt-8">{children}</div>

        <div className="mt-0 text-center text-[15px] leading-[1.35] text-dark-blue">
          {footer}
        </div>
      </div>
    </section>
  );
}
