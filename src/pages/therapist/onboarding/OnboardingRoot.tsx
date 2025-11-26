import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/config/routes";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OnboardingRoot() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in duration-500">
      <div className="bg-primary/10 p-6 rounded-full">
        <HeartHandshake className="w-16 h-16 text-primary" />
      </div>

      <div className="space-y-4 max-w-md">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to Ruh Therapy
        </h1>
        <p className="text-muted-foreground text-lg">
          We're excited to have you join our network of professionals. Let's set
          up your profile to help you reach patients who need your expertise.
        </p>
      </div>

      <Button
        size="lg"
        onClick={() => navigate(ROUTES.THERAPIST.ONBOARDING.WELCOME)}
        className="gap-2"
      >
        Start Application <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
