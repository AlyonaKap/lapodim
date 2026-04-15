import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

export function Header() {
    return (
        <header className="flex items-center justify-between px-6 lg:px-16 w-full bg-foreground rounded-full fixed z-50">
            <Logo />
            <nav className="hidden md:flex items-center gap-4 md:gap-8 lg:gap-16 text-sm font-medium">
                <a href="#" className="text-light-yellow text-xl">Допомогти тваринці</a>
                <a href="/about-us" className="text-light-yellow text-xl">Про притулок</a>
                <a href="#" className="text-light-yellow text-xl">Інше</a>
            </nav>
            <Button variant="primary" size="md">Стати господарем</Button>
        </header>
    );
}