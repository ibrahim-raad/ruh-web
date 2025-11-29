import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { UserGender } from "@/features/users/types/user.types";
import { useCountries } from "@/features/countries/api/useCountries";
import { useLanguages } from "@/features/languages/api/useLanguages";
import { userLanguagesService } from "@/features/languages/api/user-languages.service";
import { Checkbox } from "@/components/ui/checkbox";
import { AxiosError } from "axios";
import { useUpdateTherapist } from "@/features/therapists/api/useTherapists";
import { useEffect, useState } from "react";
import { SearchableSelect } from "@/shared/components/SearchableSelect";
import { useDebounce } from "@/shared/hooks/useDebounce";

const personalDetailsSchema = z.object({
  gender: z.enum(UserGender),
  date_of_birth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((dateStr) => {
      const date = new Date(dateStr);
      const today = new Date();
      const minDate = new Date(
        today.getFullYear() - 23,
        today.getMonth(),
        today.getDate()
      );
      return date <= minDate;
    }, "You must be at least 23 years old")
    .refine((dateStr) => {
      const date = new Date(dateStr);
      const today = new Date();
      const maxDate = new Date(
        today.getFullYear() - 65,
        today.getMonth(),
        today.getDate()
      );
      return date >= maxDate;
    }, "You must be less than 65 years old"),
  country_id: z.string().min(1, "Country is required"),
  language_ids: z.array(z.string()).min(1, "Select at least one language"),
});

type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;

export default function PersonalDetailsStep() {
  const navigate = useNavigate();
  const { therapist, setTherapist } = useAuthStore();

  const updateTherapist = useUpdateTherapist();

  const [countrySearch, setCountrySearch] = useState("");
  const debouncedCountrySearch = useDebounce(countrySearch, 500);

  const { data: countriesResponse } = useCountries({
    page: 1,
    limit: 100,
    name: debouncedCountrySearch,
  });
  const { data: languagesResponse } = useLanguages({ page: 1, limit: 100 });

  const countries = countriesResponse?.data || [];
  const languages = languagesResponse?.data || [];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      language_ids: [],
    },
  });

  useEffect(() => {
    if (therapist) {
      const user = therapist.user;
      const defaultValues: Partial<PersonalDetailsFormValues> = {
        gender: user.gender !== UserGender.UNKNOWN ? user.gender : undefined,
        country_id: user.country_id,
        language_ids: user.spoken_languages?.map((l) => l.id) || [],
      };

      if (user.date_of_birth) {
        defaultValues.date_of_birth = new Date(user.date_of_birth)
          .toISOString()
          .split("T")[0];
      }

      reset(defaultValues);
    }
  }, [therapist, reset]);

  const onSubmit = async (data: PersonalDetailsFormValues) => {
    if (!therapist) {
      toast.error("Session invalid. Please try logging in again.");
      return;
    }
    try {
      const updatedTherapist = await updateTherapist.mutateAsync({
        id: therapist.id,
        data: {
          therapist_version: therapist.version,
          gender: data.gender,
          date_of_birth: new Date(data.date_of_birth),
          country_id: data.country_id,
          version: therapist.user.version,
        },
      });

      if (updatedTherapist.user) {
        setTherapist(updatedTherapist);
      }

      await Promise.all(
        data.language_ids.map((langId, index) =>
          userLanguagesService.create({
            language_id: langId,
            is_primary: index === 0, // TODO: Implement primary language selection
          })
        )
      );

      toast.success("Personal details saved");
      navigate(ROUTES.THERAPIST.ONBOARDING.PROFESSIONAL_INFO);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to save details");
      } else {
        console.error(error);
        toast.error("Failed to save details");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Personal Details</h2>
        <p className="text-muted-foreground">
          Tell us a bit more about yourself.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserGender.MALE}>Male</SelectItem>
                    <SelectItem value={UserGender.FEMALE}>Female</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-sm text-destructive">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Input
              id="date_of_birth"
              type="date"
              {...register("date_of_birth")}
            />
            {errors.date_of_birth && (
              <p className="text-sm text-destructive">
                {errors.date_of_birth.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country_id">Country</Label>
          <Controller
            name="country_id"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                value={field.value}
                onChange={field.onChange}
                options={countries.map((country) => ({
                  label: country.name,
                  value: country.id,
                }))}
                onSearch={setCountrySearch}
                placeholder="Select country"
                searchPlaceholder="Search country..."
              />
            )}
          />
          {errors.country_id && (
            <p className="text-sm text-destructive">
              {errors.country_id.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Languages Spoken</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border p-4 rounded-md max-h-60 overflow-y-auto">
            <Controller
              name="language_ids"
              control={control}
              render={({ field }) => (
                <>
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lang-${lang.id}`}
                        checked={field.value?.includes(lang.id)}
                        onCheckedChange={(checked) => {
                          const current = field.value || [];
                          const newValue = checked
                            ? [...current, lang.id]
                            : current.filter((id) => id !== lang.id);
                          field.onChange(newValue);
                        }}
                      />
                      <Label
                        htmlFor={`lang-${lang.id}`}
                        className="font-normal cursor-pointer"
                      >
                        {lang.name}
                      </Label>
                    </div>
                  ))}
                </>
              )}
            />
          </div>
          {errors.language_ids && (
            <p className="text-sm text-destructive">
              {errors.language_ids.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || updateTherapist.isPending}
          >
            {isSubmitting ? "Saving..." : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}
