import { PublicFooter } from "@/widgets/footer/PublicFooter";
import { PublicNavbar } from "@/widgets/navbar/PublicNavbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
