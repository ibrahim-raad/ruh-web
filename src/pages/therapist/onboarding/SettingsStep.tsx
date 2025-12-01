import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { SettingsForm } from "@/features/therapists-settings/components/SettingsForm";

export default function SettingsStep() {
  const navigate = useNavigate();
  const { therapist } = useAuthStore();

  const handleSuccess = () => {
    navigate(ROUTES.THERAPIST.ONBOARDING.AVAILABILITY);
  };

  const handleCancel = () => {
    navigate(ROUTES.THERAPIST.ONBOARDING.PROFESSIONAL_INFO);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Configure your booking preferences.
        </p>
      </div>

      <SettingsForm
        therapistId={therapist!.id}
        onSuccess={handleSuccess}
        submitLabel="Next"
        showCancelButton={true}
        onCancel={handleCancel}
      />
    </div>
  );
}
