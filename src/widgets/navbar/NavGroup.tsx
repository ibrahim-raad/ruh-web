import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavItem } from "./NavItem";

export function NavGroup({
  label,
  icon,
  items,
}: {
  label: string;
  icon: React.ReactNode;
  items: { to: string; label: string; icon: React.ReactNode }[];
}) {
  const location = useLocation();

  const isAnyChildActive = items.some((item) =>
    location.pathname.startsWith(item.to)
  );

  const [isOpen, setIsOpen] = useState(isAnyChildActive);

  useEffect(() => {
    if (isAnyChildActive && !isOpen) {
      setTimeout(() => {
        setIsOpen(true);
      }, 100);
    }
  }, [location.pathname, isAnyChildActive, isOpen]);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full">
      <button
        onClick={toggleOpen}
        className={cn(
          "w-full inline-flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground",
          isAnyChildActive
            ? "text-foreground font-semibold"
            : "text-muted-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          <span className={cn(isAnyChildActive ? "text-primary" : "")}>
            {icon}
          </span>
          {label}
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="mt-1 space-y-1 pl-4 relative animate-in slide-in-from-top-2 duration-200">
          <div className="absolute left-[11px] top-0 bottom-0 w-px bg-border" />
          {items.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
}
