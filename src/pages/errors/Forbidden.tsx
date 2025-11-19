import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ShieldAlert } from "lucide-react";
import { ROUTES } from "@/shared/config/routes";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-destructive/10 text-destructive mx-auto">
            <ShieldAlert className="h-12 w-12" />
          </div>
          <h1 className="text-6xl font-bold text-foreground">403</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Access Denied
          </h2>
          <p className="text-muted-foreground">
            You don't have permission to access this page. Please contact your
            administrator if you believe this is an error.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild variant="default" size="lg">
            <Link to={ROUTES.HOME}>
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
