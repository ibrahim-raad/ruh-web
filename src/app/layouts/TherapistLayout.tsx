import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/widgets/ThemeToggle";
import { UserProfile } from "@/widgets/UserProfile";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { authService } from "@/features/auth/api/auth.service";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProfileDialog } from "@/widgets/ProfileDialog";

export default function TherapistLayout() {
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
        <span className="text-primary font-bold text-lg ml-2">Therapist</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">{/* General Items */}</nav>

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
            {user && <UserProfile user={user} onClick={handleProfileClick} />}
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
