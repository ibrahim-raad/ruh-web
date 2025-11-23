import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { authService } from "@/features/auth/api/auth.service";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error"
  );

  useEffect(() => {
    if (!token) return;

    let mounted = true;

    authService
      .verifyEmail(token)
      .then(() => {
        if (mounted) setStatus("success");
      })
      .catch(() => {
        if (mounted) setStatus("error");
      });

    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-8 text-center space-y-6 shadow-lg">
        {status === "loading" && (
          <>
            <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
            <h1 className="text-2xl font-bold">Verifying...</h1>
            <p className="text-muted-foreground">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="w-12 h-12 mx-auto text-green-500" />
            <h1 className="text-2xl font-bold">Email Verified!</h1>
            <p className="text-muted-foreground">
              Your email has been successfully verified.
            </p>
            <Button asChild className="w-full">
              <Link to={ROUTES.AUTH.LOGIN}>Continue to Login</Link>
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-12 h-12 mx-auto text-destructive" />
            <h1 className="text-2xl font-bold">Verification Failed</h1>
            <p className="text-muted-foreground">
              The link is invalid or has expired.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to={ROUTES.AUTH.LOGIN}>Back to Login</Link>
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
