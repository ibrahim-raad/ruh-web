import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, RefreshCw } from "lucide-react";
import { ROUTES } from "@/shared/config/routes";

export default function ServerErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-destructive">500</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Something went wrong
          </h2>
          <p className="text-muted-foreground">
            We're experiencing technical difficulties. Our team has been
            notified and is working on a fix. Please try again later.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            variant="default"
            size="lg"
            onClick={() => window.location.reload()}
          >
            <button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
          </Button>
          <Button asChild variant="outline" size="lg">
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
