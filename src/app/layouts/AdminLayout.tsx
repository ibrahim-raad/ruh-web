import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import {
  LogOut,
  Coins,
  Globe,
  Languages,
  BookOpen,
  Users,
  Menu,
  ChevronDown,
  ChevronRight,
  FileQuestion,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/widgets/ThemeToggle";
import { UserProfile } from "@/widgets/UserProfile";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { authService } from "@/features/auth/api/auth.service";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ProfileDialog } from "@/widgets/ProfileDialog";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
    setIsProfileOpen(true);
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-background">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b">
        <img src="/logo.png" alt="Ruh Therapy" className="h-12" />
        <span className="text-primary font-bold text-lg ml-2">Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {/* General Items */}
        <NavItem
          to={ROUTES.ADMIN.ADMINS}
          label="Admins"
          icon={<Users className="h-5 w-5" />}
        />
        <NavItem
          to={ROUTES.ADMIN.SPECIALIZATIONS}
          label="Specializations"
          icon={<BookOpen className="h-5 w-5" />}
        />
        <NavGroup
          label="Questionnaires"
          icon={<BookOpen className="h-5 w-5" />}
          items={[
            {
              to: ROUTES.ADMIN.QUESTIONNAIRES,
              label: "Questionnaires",
              icon: <FileQuestion className="h-5 w-5" />,
            },
          ]}
        />
        <NavGroup
          label="Localization"
          icon={<Globe className="h-5 w-5" />}
          items={[
            {
              to: ROUTES.ADMIN.COUNTRIES,
              label: "Countries",
              icon: <Globe className="h-5 w-5" />,
            },
            {
              to: ROUTES.ADMIN.CURRENCIES,
              label: "Currencies",
              icon: <Coins className="h-5 w-5" />,
            },
            {
              to: ROUTES.ADMIN.LANGUAGES,
              label: "Languages",
              icon: <Languages className="h-5 w-5" />,
            },
          ]}
        />
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
    </div>
  );

  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr] bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden border-r bg-background md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex min-h-screen flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-6 bg-background">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden shrink-0"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[260px]">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <div className="font-semibold text-lg text-foreground">
              Dashboard
            </div>
          </div>

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
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>

        <ProfileDialog open={isProfileOpen} onOpenChange={setIsProfileOpen} />
      </div>
    </div>
  );
}

function NavItem({
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

function NavGroup({
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
