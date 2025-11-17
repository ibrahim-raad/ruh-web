import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/widgets/ThemeToggle";

export default function AdminLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] bg-background text-foreground">
      <aside className="border-r bg-background">
        <div className="h-14 flex items-center px-4 font-semibold">
          RUH Admin
        </div>
        <nav className="px-2 py-2 space-y-1">
          <NavItem to="/admin/overview" label="Overview" />
          <NavItem to="/admin/users" label="Users" />
          <NavItem to="/admin/therapists" label="Therapists" />
          <NavItem to="/admin/appointments" label="Appointments" />
          <NavItem to="/admin/payments" label="Payments" />
          <NavItem to="/admin/patients" label="Patients" />
        </nav>
      </aside>
      <div className="flex min-h-screen flex-col">
        <header className="h-14 border-b flex items-center justify-between px-4">
          <div className="font-medium">Dashboard</div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost">Docs</Button>
            <Button>New</Button>
          </div>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "w-full inline-flex items-center rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-accent text-accent-foreground"
            : "hover:bg-accent hover:text-accent-foreground",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}
