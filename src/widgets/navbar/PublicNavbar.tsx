import { Link, NavLink } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "@/components/ui/button";

type navItem = {
  label: string;
  to: string;
};

const navItems: navItem[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "For Patients",
    to: "/for-patients",
  },
  {
    label: "For Therapists",
    to: "/for-therapists",
  },
  {
    label: "Contact",
    to: "/contact",
  },
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
      <div className="mx-auto max-w-7xl h-16 px-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 font-semibold">
          <img src="/logo.png" alt="ruh therapy" className="h-6" />
          <span className="sr-only">Ruh Therapy</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                [
                  "text-foreground/80 hover:text-foreground transition-colors",
                  isActive && "text-foreground",
                ].join(" ")
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Join Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
