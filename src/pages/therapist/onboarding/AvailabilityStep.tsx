import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { WeeklyAvailabilityForm } from "@/features/therapists-availability/components/WeeklyAvailabilityForm";

export default function AvailabilityStep() {
  const navigate = useNavigate();
  const { therapist } = useAuthStore();

  const handleSuccess = () => {
    navigate(ROUTES.THERAPIST.ONBOARDING.IDENTITY);
  };

  const handleCancel = () => {
    navigate(ROUTES.THERAPIST.ONBOARDING.SETTINGS);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Availability</h2>
        <p className="text-muted-foreground">
          Set your weekly working hours. Enable the days you are available.
        </p>
      </div>

      <WeeklyAvailabilityForm
        therapistId={therapist!.id}
        onSuccess={handleSuccess}
        submitLabel="Next"
        showCancelButton={true}
        onCancel={handleCancel}
      />
    </div>
  );
}
