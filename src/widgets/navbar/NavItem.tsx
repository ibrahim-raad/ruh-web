import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export function NavItem({
  to,
  label,
  icon,
  className,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "w-full inline-flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-secondary text-secondary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
          className
        )
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
