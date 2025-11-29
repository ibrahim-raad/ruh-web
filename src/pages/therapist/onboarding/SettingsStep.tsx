import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchableSelect } from "@/shared/components/SearchableSelect";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  useTherapistSettings,
  useUpdateTherapistSettings,
} from "@/features/therapists-settings/api/useTherapistsSettings";
import { useEffect } from "react";
import { AxiosError } from "axios";

const settingsSchema = z.object({
  is_open: z.boolean(),
  booking_threshold_hours: z.coerce.number().min(1, "Must be at least 1 hour"),
  max_booking_days: z.coerce.number().min(1, "Must be at least 1 day"),
  max_sessions_per_day: z.coerce.number().min(1, "Must be at least 1 session"),
  session_duration_minutes: z.coerce
    .number()
    .min(15, "Must be at least 15 minutes"),
  timezone: z.string().min(1, "Timezone is required"),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const TIMEZONES = Intl.supportedValuesOf("timeZone");

export default function SettingsStep() {
  const navigate = useNavigate();
  const { therapist } = useAuthStore();

  const { data: settings } = useTherapistSettings(therapist!.id);

  const updateSettings = useUpdateTherapistSettings();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema) as Resolver<SettingsFormValues>,
    defaultValues: {
      is_open: false,
      booking_threshold_hours: 24,
      max_booking_days: 30,
      max_sessions_per_day: 8,
      session_duration_minutes: 60,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  useEffect(() => {
    if (settings) {
      reset({
        is_open: settings.is_open,
        booking_threshold_hours: settings.booking_threshold_hours,
        max_booking_days: settings.max_booking_days,
        max_sessions_per_day: settings.max_sessions_per_day,
        session_duration_minutes: settings.session_duration_minutes,
        timezone: settings.timezone,
      });
    }
  }, [settings, reset]);

  const onSubmit = async (data: SettingsFormValues) => {
    if (!settings) {
      toast.error("Settings not found. Please contact support.");
      return;
    }

    try {
      await updateSettings.mutateAsync({
        id: "", // the backend will use the therapist_id to update the settings
        data: {
          ...data,
          version: settings.version,
        },
      });

      toast.success("Settings saved");
      navigate(ROUTES.THERAPIST.ONBOARDING.AVAILABILITY);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error("Failed to save settings");
      } else {
        console.error(error);
        toast.error("Failed to save settings");
      }
    }
  };

  const isOpen = watch("is_open");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Configure your booking preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Controller
              name="is_open"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="is_open"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="is_open" className="cursor-pointer">
              Allow anytime booking?
            </Label>
          </div>

          {isOpen && (
            <Alert variant="default" className="bg-muted/50 [&>svg]:top-3">
              <Info className="h-4 w-4" />
              <AlertDescription>
                When "Allow anytime booking" is enabled, patients can book
                appointments freely based on your availability, bypassing some
                restrictive settings. You will still need to approve or reject
                each booking request.
              </AlertDescription>
            </Alert>
          )}

          {!isOpen && (
            <Alert variant="default" className="bg-muted/50 [&>svg]:top-3">
              <Info className="h-4 w-4" />
              <AlertDescription>
                You will need to approve or reject each booking request from
                patients.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="session_duration_minutes">
              Session Duration (minutes)
            </Label>
            <Input type="number" {...register("session_duration_minutes")} />
            {errors.session_duration_minutes && (
              <p className="text-sm text-destructive">
                {errors.session_duration_minutes.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="max_sessions_per_day">Max Sessions Per Day</Label>
            <Input type="number" {...register("max_sessions_per_day")} />
            {errors.max_sessions_per_day && (
              <p className="text-sm text-destructive">
                {errors.max_sessions_per_day.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking_threshold_hours">
              Minimum Notice (hours)
            </Label>
            <Input type="number" {...register("booking_threshold_hours")} />
            <p className="text-xs text-muted-foreground">
              How many hours in advance must a patient book?
            </p>
            {errors.booking_threshold_hours && (
              <p className="text-sm text-destructive">
                {errors.booking_threshold_hours.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="max_booking_days">
              Advance Booking Limit (days)
            </Label>
            <Input type="number" {...register("max_booking_days")} />
            <p className="text-xs text-muted-foreground">
              How far in the future can patients book?
            </p>
            {errors.max_booking_days && (
              <p className="text-sm text-destructive">
                {errors.max_booking_days.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Controller
            name="timezone"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                value={field.value}
                onChange={field.onChange}
                options={TIMEZONES.map((tz) => ({ label: tz, value: tz }))}
                placeholder="Select timezone"
                searchPlaceholder="Search timezone..."
              />
            )}
          />
          {errors.timezone && (
            <p className="text-sm text-destructive">
              {errors.timezone.message}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              navigate(ROUTES.THERAPIST.ONBOARDING.PROFESSIONAL_INFO)
            }
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || updateSettings.isPending}
          >
            {isSubmitting ? "Saving..." : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}
