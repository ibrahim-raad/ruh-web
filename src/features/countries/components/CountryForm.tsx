import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Country, CreateCountryDto } from "../types/country.types";

const countrySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
});

type CountryFormValues = z.infer<typeof countrySchema>;

interface CountryFormProps {
  country?: Country;
  onSubmit: (data: CreateCountryDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CountryForm({
  country,
  onSubmit,
  onCancel,
  isLoading,
}: CountryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CountryFormValues>({
    resolver: zodResolver(countrySchema),
    defaultValues: country
      ? {
          name: country.name,
        }
      : {
          name: "",
        },
  });

  const handleFormSubmit = (data: CountryFormValues) => {
    onSubmit({
      name: data.name,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Lebanon"
          {...register("name")}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : country ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
