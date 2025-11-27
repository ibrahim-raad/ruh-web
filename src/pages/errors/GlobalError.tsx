import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertCircle } from "lucide-react";
import { ROUTES } from "@/shared/config/routes";

export default function GlobalError() {
  const error = useRouteError();
  let errorMessage = "An unexpected error occurred.";
  let errorTitle = "Oops!";
  let statusCode = "";

  if (isRouteErrorResponse(error)) {
    statusCode = error.status.toString();
    errorTitle = error.statusText;
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          {statusCode && (
            <h1 className="text-9xl font-bold text-destructive">
              {statusCode}
            </h1>
          )}
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            {errorTitle}
          </h2>
          <p className="text-muted-foreground wrap-break-word">
            {errorMessage}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="default"
            size="lg"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
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
