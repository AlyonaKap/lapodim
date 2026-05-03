import { Link } from "react-router-dom";

export function HeaderLikeLink() {
  return (
    <Link
      to="/likes"
      className="hidden h-11 w-11 items-center justify-center rounded-full bg-light-blue transition-transform hover:scale-110 md:flex"
      aria-label="Вподобання"
    >
      <svg viewBox="0 0 24 22" className="h-7 w-7" aria-hidden="true">
        <path
          d="M12.001 20.727L10.55 19.405C5.4 14.74 2 11.657 2 7.874C2 4.79 4.42 2.5 7.5 2.5C9.24 2.5 10.91 3.309 12.001 4.577C13.091 3.309 14.762 2.5 16.501 2.5C19.581 2.5 22.001 4.79 22.001 7.874C22.001 11.657 18.602 14.74 13.451 19.414L12.001 20.727Z"
          fill="var(--color-primary)"
          stroke="var(--color-primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </Link>
  );
}
