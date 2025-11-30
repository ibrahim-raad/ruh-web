import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  useTherapistsAvailability,
  useUpdateTherapistAvailability,
} from "@/features/therapists-availability/api/useTherapistsAvailability";
import { DayOfWeek } from "@/features/therapists-availability/types/therapist-availability.types";
import { useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AxiosError } from "axios";

const availabilityItemSchema = z
  .object({
    id: z.string().optional(),
    day_of_week: z.enum(DayOfWeek),
    start_time: z.string(),
    end_time: z.string(),
    break_start_time: z.string().optional(),
    break_end_time: z.string().optional(),
    version: z.number().optional(),
    enabled: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.enabled) {
      if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.start_time)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid time format",
          path: ["start_time"],
        });
      }
      if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.end_time)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid time format",
          path: ["end_time"],
        });
      }
      if (
        data.break_start_time &&
        !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.break_start_time)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid time format",
          path: ["break_start_time"],
        });
      }
      if (
        data.break_end_time &&
        !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.break_end_time)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid time format",
          path: ["break_end_time"],
        });
      }
    }
  });

const availabilitySchema = z.object({
  availabilities: z.array(availabilityItemSchema),
});

type AvailabilityFormValues = z.infer<typeof availabilitySchema>;

const ORDERED_DAYS = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
  DayOfWeek.SUNDAY,
];

export default function AvailabilityStep() {
  const navigate = useNavigate();
  const { therapist } = useAuthStore();

  const { data: availabilityResponse, isLoading } = useTherapistsAvailability({
    therapist_id: therapist!.id,
  });

  const availabilities = useMemo(
    () => availabilityResponse?.data || [],
    [availabilityResponse?.data]
  );

  const updateAvailability = useUpdateTherapistAvailability();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      availabilities: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "availabilities",
  });

  const watchedAvailabilities = useWatch({
    control,
    name: "availabilities",
  });

  useEffect(() => {
    if (!isLoading) {
      const formValues = ORDERED_DAYS.map((day) => {
        const existing = availabilities.find((a) => a.day_of_week === day);
        if (existing) {
          return {
            id: existing.id,
            day_of_week: day,
            start_time: existing.start_time.slice(0, 5),
            end_time: existing.end_time.slice(0, 5),
            break_start_time: existing.break_start_time?.slice(0, 5) || "",
            break_end_time: existing.break_end_time?.slice(0, 5) || "",
            version: existing.version,
            enabled: Boolean(existing.is_active),
          };
        } else {
          return {
            day_of_week: day,
            start_time: "09:00",
            end_time: "17:00",
            break_start_time: "",
            break_end_time: "",
            enabled: false,
          };
        }
      });
      reset({ availabilities: formValues });
    }
  }, [availabilities, isLoading, reset]);

  const onSubmit = async (data: AvailabilityFormValues) => {
    try {
      const promises = data.availabilities.map(async (item) => {
        if (item.id) {
          return updateAvailability.mutateAsync({
            id: item.id,
            data: {
              start_time: item.start_time,
              end_time: item.end_time,
              break_start_time: item.break_start_time || "00:00",
              break_end_time: item.break_end_time || "00:00",
              version: item.version!,
              is_active: item.enabled,
            },
          });
        }
        return Promise.resolve();
      });

      await Promise.all(promises);

      toast.success("Availability saved successfully");
      navigate(ROUTES.THERAPIST.ONBOARDING.IDENTITY);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to save availability"
        );
      } else {
        console.error(error);
        toast.error("Failed to save availability");
      }
    }
  };

  const isSaving = isSubmitting || updateAvailability.isPending;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Availability</h2>
        <p className="text-muted-foreground">
          Set your weekly working hours. Enable the days you are available.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => {
            const isEnabled = watchedAvailabilities?.[index]?.enabled ?? false;

            return (
              <Card key={field.id} className={!isEnabled ? "opacity-60" : ""}>
                <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3 min-w-[140px]">
                    <Controller
                      control={control}
                      name={`availabilities.${index}.enabled`}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          checked={value}
                          onCheckedChange={onChange}
                          id={`day-${index}`}
                        />
                      )}
                    />
                    <Label
                      htmlFor={`day-${index}`}
                      className="font-medium capitalize cursor-pointer"
                    >
                      {field.day_of_week.toLowerCase()}
                    </Label>
                  </div>

                  {isEnabled ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                      <div className="space-y-2">
                        <Label className="text-xs">Start Time</Label>
                        <Input
                          type="time"
                          {...register(`availabilities.${index}.start_time`)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">End Time</Label>
                        <Input
                          type="time"
                          {...register(`availabilities.${index}.end_time`)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Break Start</Label>
                        <Input
                          type="time"
                          {...register(
                            `availabilities.${index}.break_start_time`
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Break End</Label>
                        <Input
                          type="time"
                          {...register(
                            `availabilities.${index}.break_end_time`
                          )}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 text-sm text-muted-foreground py-2 md:py-0">
                      Unavailable
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          {Object.keys(errors).length > 0 && (
            <div className="text-sm text-destructive">
              <p>Please check the form for errors.</p>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(ROUTES.THERAPIST.ONBOARDING.SETTINGS)}
          >
            Back
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}
