import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ROUTES } from "@/shared/config/routes";
import { authService } from "@/features/auth/api/auth.service";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    try {
      await authService.forgotPassword(data.email);
      setIsSent(true);
      toast.success("Reset link sent!");
    } catch (error) {
      console.error("Forgot password failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password?</h1>
          {!isSent && (
            <p className="text-muted-foreground">
              Enter your email to receive reset instructions.
            </p>
          )}
        </div>

        {isSent ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Check your email</h3>
              <p className="text-muted-foreground text-sm">
                We've sent a password reset link to the email you provided.
              </p>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link to={ROUTES.AUTH.LOGIN}>Back to Login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center">
              <Link
                to={ROUTES.AUTH.LOGIN}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
