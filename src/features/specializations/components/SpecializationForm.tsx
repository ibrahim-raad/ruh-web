import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  Specialization,
  CreateSpecializationDto,
} from "../types/specialization.types";
import { Textarea } from "@/components/ui/textarea";

const specializationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  description: z.string().optional(),
});

type SpecializationFormValues = z.infer<typeof specializationSchema>;

interface SpecializationFormProps {
  specialization?: Specialization;
  onSubmit: (data: CreateSpecializationDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function SpecializationForm({
  specialization,
  onSubmit,
  onCancel,
  isLoading,
}: SpecializationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpecializationFormValues>({
    resolver: zodResolver(specializationSchema),
    defaultValues: specialization
      ? {
          name: specialization.name,
          description: specialization.description || "",
        }
      : {
          name: "",
          description: "",
        },
  });

  const handleFormSubmit = (data: SpecializationFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Name"
          {...register("name")}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter a description for the specialization"
          {...register("description")}
          disabled={isLoading}
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
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
          {isLoading ? "Saving..." : specialization ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
