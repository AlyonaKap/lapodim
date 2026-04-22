import { cn } from "@/utils/cn";
import { Logo } from "@/components/Logo";

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "bg-primary w-full pt-20 pb-8 px-4 lg:px-16 relative",
        className,
      )}
    >
      <div className="absolute left-0 top-0 w-full overflow-hidden leading-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-[30px] md:h-[60px] block"
        >
          <path
            d="M 0 0 C 480 80 960 80 1440 0 V 0 H 0 Z"
            fill="var(--color-background-light)"
          />
        </svg>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 text-dark-blue text-[22px] tracking-wide">
        <div>
          <Logo textClassName="text-dark-blue" />
          <span>© Притулок "Лаподім" 2026</span>
        </div>

        <div className="flex flex-col gap-1 leading-normal">
          <a
            href="#"
            className="hover:underline hover:opacity-80 transition-opacity"
          >
            Допомогти тваринці
          </a>
          <a
            href="/about-us"
            className="hover:underline hover:opacity-80 transition-opacity"
          >
            Про нас
          </a>
          <a
            href="#"
            className="hover:underline hover:opacity-80 transition-opacity"
          >
            Інше
          </a>
        </div>

        <div className="flex flex-col gap-1 leading-normal">
          <a
            href="mailto:lapodim_shelter@gmail.com"
            className="hover:underline hover:opacity-80 transition-opacity"
          >
            lapodim_shelter@gmail.com
          </a>
          <a
            href="tel:+380675609876"
            className="hover:underline hover:opacity-80 transition-opacity"
          >
            +380675609876
          </a>
        </div>
      </div>
    </footer>
  );
}
