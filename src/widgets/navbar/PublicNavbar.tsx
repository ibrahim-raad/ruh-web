import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ROUTES } from "@/shared/config/routes";

type navItem = {
  label: string;
  to: string;
};

const navItems: navItem[] = [
  {
    label: "Home",
    to: ROUTES.HOME,
  },
  {
    label: "About",
    to: ROUTES.ABOUT,
  },
  {
    label: "For Patients",
    to: ROUTES.FOR_PATIENTS,
  },
  {
    label: "For Therapists",
    to: ROUTES.FOR_THERAPISTS,
  },
  {
    label: "Contact",
    to: ROUTES.CONTACT,
  },
];

export function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
      <div className="mx-auto max-w-7xl h-16 px-4 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="inline-flex items-center">
          <img src="/logo.png" alt="ruh therapy" className="h-20" />
          <span className="text-primary font-bold text-lg">Ruh Therapy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                [
                  "relative text-foreground/70 hover:text-foreground transition-colors duration-200",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300",
                  "hover:after:w-full",
                  isActive &&
                    "text-foreground font-medium after:w-full after:bg-primary",
                ].join(" ")
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link to={ROUTES.AUTH.LOGIN}>Log in</Link>
          </Button>
          <Button asChild>
            <Link to={ROUTES.AUTH.REGISTER}>Join Now</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="px-4 py-4 space-y-3">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "block px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground/70 hover:bg-accent hover:text-foreground",
                  ].join(" ")
                }
              >
                {n.label}
              </NavLink>
            ))}
            <div className="pt-3 border-t space-y-2">
              <Button asChild variant="ghost" className="w-full">
                <Link
                  to={ROUTES.AUTH.LOGIN}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link
                  to={ROUTES.AUTH.REGISTER}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Now
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
