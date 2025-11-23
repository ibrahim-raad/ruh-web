import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { LogOut, Coins, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/widgets/ThemeToggle";
import { UserProfile } from "@/widgets/UserProfile";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { authService } from "@/features/auth/api/auth.service";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      logout();
      navigate(ROUTES.AUTH.LOGIN);
    }
  };

  const handleProfileClick = () => {
    // TODO: Navigate to profile page when implemented
    // navigate(ROUTES.ADMIN.PROFILE);
    console.log("Navigate to profile");
  };

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-background text-foreground">
      {/* Sidebar */}
      <aside className="border-r bg-background flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b">
          <img src="/logo.png" alt="Ruh Therapy" className="h-12" />
          <span className="text-primary font-bold text-lg ml-2">Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {/* <NavItem
            to={ROUTES.ADMIN.OVERVIEW}
            label="Overview"
            icon={<LayoutDashboard className="h-5 w-5" />}
          />
          <NavItem
            to={ROUTES.ADMIN.THERAPISTS}
            label="Therapists"
            icon={<UserCheck className="h-5 w-5" />}
          />
          <NavItem
            to={ROUTES.ADMIN.PATIENTS}
            label="Patients"
            icon={<HeartPulse className="h-5 w-5" />}
          />
          <NavItem
            to={ROUTES.ADMIN.SESSIONS}
            label="Sessions"
            icon={<Calendar className="h-5 w-5" />}
          />
          <NavItem
            to={ROUTES.ADMIN.PAYMENTS}
            label="Payments"
            icon={<DollarSign className="h-5 w-5" />}
          /> */}
          <NavItem
            to={ROUTES.ADMIN.CURRENCIES}
            label="Currencies"
            icon={<Coins className="h-5 w-5" />}
          />
          <NavItem
            to={ROUTES.ADMIN.COUNTRIES}
            label="Countries"
            icon={<Globe className="h-5 w-5" />}
          />
          {/* <NavItem
            to={ROUTES.ADMIN.SETTINGS}
            label="Settings"
            icon={<Settings className="h-5 w-5" />}
          /> */}
        </nav>

        {/* Logout at bottom */}
        <div className="p-3 border-t">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6">
          <div className="font-semibold text-lg text-foreground">Dashboard</div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user && (
              <UserProfile
                user={{
                  name: user.full_name,
                  email: user.email,
                  avatar: user.profile_url || null,
                }}
                onClick={handleProfileClick}
              />
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "w-full inline-flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-secondary text-secondary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-foreground",
        ].join(" ")
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
