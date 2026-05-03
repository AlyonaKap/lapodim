import { Button } from "@/components/ui/Button";
import { HeaderLikeLink } from "@/components/ui/HeaderLikeLink";
import { useOpenLoginPage } from "@/hooks/useOpenLoginPage";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export function Header() {
  const openLoginPage = useOpenLoginPage();
  const { user } = useAuth();

  return (
    <header className="fixed z-50 flex w-full items-center justify-between gap-8 rounded-full bg-foreground px-6 lg:px-16">
      <Logo />
      <nav className="hidden items-center gap-4 text-sm font-medium md:flex md:gap-10 lg:gap-25">
        <Link to="/pet-catalog" className="text-light-yellow text-xl">
          Допомогти тваринці
        </Link>
        <Link to="/about-us" className="text-light-yellow text-xl">
          Про притулок
        </Link>
      </nav>
      <div className="flex items-center gap-2  lg:gap-3">
        <HeaderLikeLink />
        {user ? (
          <Link
            to="/profile"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-dark-blue transition-transform hover:scale-110"
            aria-label="Профіль"
          >
            <span className="text-[22px] leading-none">👤</span>
          </Link>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={() => openLoginPage("owner")}
          >
            Стати господарем
          </Button>
        )}
      </div>
    </header>
  );
}
