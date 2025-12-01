import { useAuthStore } from "@/features/auth/store/auth.store";
import { SettingsForm } from "@/features/therapists-settings/components/SettingsForm";

export default function SettingsPage() {
  const { therapist } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto w-full py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Configure your booking preferences.
        </p>
      </div>
      <SettingsForm therapistId={therapist!.id} />
    </div>
  );
}
