import { Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

const STEPS = [
  { path: ROUTES.THERAPIST.ONBOARDING.WELCOME, label: "Welcome" },
  {
    path: ROUTES.THERAPIST.ONBOARDING.PERSONAL_DETAILS,
    label: "Personal Details",
  },
  {
    path: ROUTES.THERAPIST.ONBOARDING.PROFESSIONAL_INFO,
    label: "Professional Info",
  },
  { path: ROUTES.THERAPIST.ONBOARDING.SETTINGS, label: "Settings" },
  { path: ROUTES.THERAPIST.ONBOARDING.AVAILABILITY, label: "Availability" },
  {
    path: ROUTES.THERAPIST.ONBOARDING.IDENTITY,
    label: "Identity Verification",
  },
];

export default function TherapistOnboardingLayout() {
  const location = useLocation();
  const currentStepIndex = Math.max(
    0,
    STEPS.findIndex((step) => step.path === location.pathname)
  );
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl px-4">
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
            <span>
              Step {currentStepIndex + 1} of {STEPS.length}
            </span>
            <span>{STEPS[currentStepIndex]?.label}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm border p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
