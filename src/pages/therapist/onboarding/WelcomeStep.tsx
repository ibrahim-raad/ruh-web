import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/features/auth/api/auth.service";
import { ROUTES } from "@/shared/config/routes";
import { toast } from "sonner";
import { UserRole } from "@/features/users/types/user.types";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { therapistsService } from "@/features/therapists/api/therapists.service";

const signupSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function WelcomeStep() {
  const navigate = useNavigate();
  const { login, setTherapist } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await authService.register({
        ...data,
        role: UserRole.THERAPIST,
      });

      if (response.tokens.access_token) {
        login(response.tokens.access_token, response.user);
        const therapist = await therapistsService.getMe();
        setTherapist(therapist);
        toast.success("Account created successfully!");
        navigate(ROUTES.THERAPIST.ONBOARDING.PERSONAL_DETAILS);
      } else {
        toast.error("Registration successful but no token received.");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to create account"
        );
      } else {
        console.error(error);
        toast.error("Failed to create account");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome to Ruh Therapy
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Join our community of mental health professionals. We'll guide you
          through a few simple steps to set up your professional profile and get
          you started.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-card p-6 rounded-lg border shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Create your account</h2>
            <p className="text-sm text-muted-foreground">
              Enter your basic details to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                placeholder="Dr. John Doe"
                {...register("full_name")}
              />
              {errors.full_name && (
                <p className="text-sm text-destructive">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Start Application"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
