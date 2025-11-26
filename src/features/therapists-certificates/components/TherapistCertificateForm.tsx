import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  TherapistCertificate,
  CreateTherapistCertificateDto,
} from "../types/therapist-certificate.types";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useSpecializations } from "@/features/specializations/api/useSpecializations";
import { SearchableSelect } from "@/shared/components/SearchableSelect";

const therapistCertificateSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  issuer: z
    .string()
    .min(1, "Issuer is required")
    .max(255, "Issuer must be less than 255 characters"),
  issued_date: z.date(),
  description: z.string().optional(),
  specialization_id: z.uuid("Please select a valid specialization").optional(),
});

type TherapistCertificateFormValues = z.infer<
  typeof therapistCertificateSchema
>;

interface TherapistCertificateFormProps {
  therapistCertificate?: TherapistCertificate;
  onSubmit: (data: CreateTherapistCertificateDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TherapistCertificateForm({
  therapistCertificate,
  onSubmit,
  onCancel,
  isLoading,
}: TherapistCertificateFormProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: specializations } = useSpecializations({
    limit: 100,
    name: debouncedSearch,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TherapistCertificateFormValues>({
    resolver: zodResolver(therapistCertificateSchema),
    defaultValues: therapistCertificate
      ? {
          title: therapistCertificate.title,
          issuer: therapistCertificate.issuer,
          issued_date: therapistCertificate.issued_date,
          description: therapistCertificate.description,
          specialization_id: therapistCertificate.specialization_id,
        }
      : {
          title: "",
          issuer: "",
          issued_date: new Date(),
          description: "",
          specialization_id: undefined,
        },
  });

  const handleFormSubmit = (data: TherapistCertificateFormValues) => {
    onSubmit(data);
  };

  const selectedSpecializationId = useWatch({
    control,
    name: "specialization_id",
  });

  const selectedSpecialization =
    specializations?.data.find(
      (specialization) => specialization.id === selectedSpecializationId
    ) ||
    (therapistCertificate?.specialization?.id === selectedSpecializationId
      ? therapistCertificate?.specialization
      : null);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Title"
          {...register("title")}
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter a description for the certificate"
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
      <div className="space-y-2">
        <Label htmlFor="issuer">
          Issuer <span className="text-destructive">*</span>
        </Label>
        <Input
          id="issuer"
          placeholder="Issuer"
          {...register("issuer")}
          disabled={isLoading}
        />
        {errors.issuer && (
          <p className="text-sm text-destructive">{errors.issuer.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="issued_date">
          Issued Date <span className="text-destructive">*</span>
        </Label>
        <Input
          id="issued_date"
          type="date"
          placeholder="Issued Date"
          {...register("issued_date")}
          disabled={isLoading}
          className="w-full"
        />
        {errors.issued_date && (
          <p className="text-sm text-destructive">
            {errors.issued_date.message}
          </p>
        )}
      </div>
      <div className="space-y-2 flex flex-col">
        <Label htmlFor="specialization_id">Specialization</Label>
        <SearchableSelect
          value={selectedSpecializationId}
          onChange={(val) => setValue("specialization_id", val)}
          options={
            specializations?.data.map((specialization) => ({
              label: specialization.name,
              value: specialization.id,
            })) || []
          }
          onSearch={setSearch}
          placeholder="Select specialization"
          searchPlaceholder="Search specialization..."
          disabled={isLoading}
          selectedLabel={selectedSpecialization?.name}
        />
        {errors.specialization_id && (
          <p className="text-sm text-destructive">
            {errors.specialization_id.message}
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
          {isLoading ? "Saving..." : therapistCertificate ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
