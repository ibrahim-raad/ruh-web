import {
  useForm,
  Controller,
  useFieldArray,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { toast } from "sonner";
import { useUpdateTherapist } from "@/features/therapists/api/useTherapists";
import { useSpecializations } from "@/features/specializations/api/useSpecializations";
import {
  useCreateTherapistCertificate,
  useMyCertificates,
} from "@/features/therapists-certificates/api/useTherapistsCertificates";
import { therapistsCertificatesService } from "@/features/therapists-certificates/api/therapists-certificates.service";
import { therapistSpecializationsService } from "@/features/specializations/api/therapist-specializations.service";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { AxiosError } from "axios";
import { FileUpload } from "@/shared/components/form/FileUpload";
import { FileViewer } from "@/shared/components/FileViewer";
import type { TherapistCertificate } from "@/features/therapists-certificates/types/therapist-certificate.types";
import { useAuthStore } from "@/features/auth/store/auth.store";

const professionalInfoSchema = z.object({
  years_of_experience: z.coerce.number().min(0, "Must be 0 or greater"),
  specialization_ids: z
    .array(z.string())
    .min(1, "Select at least one specialization"),
  license_number: z.string().min(1, "License number is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  certificates: z
    .array(
      z.object({
        title: z.string().min(1, "Certificate title is required"),
        issuer: z.string().min(1, "Issuer is required"),
        issued_date: z
          .string()
          .min(1, "Date is required")
          .refine((dateStr) => {
            const date = new Date(dateStr);
            return date <= new Date();
          }, "Date must be in the past"),
        description: z.string().optional(),
        file: z
          .instanceof(File)
          .optional()
          .refine(
            (file) => file instanceof File || file === undefined,
            "File is required"
          ),
        existing_file_url: z.string().optional(),
      })
    )
    .optional()
    .superRefine((certificates, ctx) => {
      certificates?.forEach((cert, index) => {
        if (!cert.file && !cert.existing_file_url) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File is required",
            path: [index, "file"],
          });
        }
      });
    }),
});

type ProfessionalInfoFormValues = z.infer<typeof professionalInfoSchema>;

export default function ProfessionalInfoStep() {
  const navigate = useNavigate();

  const { therapist } = useAuthStore();
  const updateTherapist = useUpdateTherapist();
  const createCertificate = useCreateTherapistCertificate();
  const { data: defaultCertificatesResponse } = useMyCertificates();
  const rawDefaultCertificates = defaultCertificatesResponse?.data;

  const { data: specializationsResponse } = useSpecializations({
    page: 1,
    limit: 100,
  });
  const specializations = specializationsResponse?.data || [];

  const defaultValues = useMemo(() => {
    const defaultCertificates = rawDefaultCertificates || [];

    return {
      years_of_experience: therapist?.years_of_experience || 0,
      license_number: therapist?.license_number || "",
      bio: therapist?.bio || "",
      specialization_ids:
        therapist?.specializations?.map((spec) => spec.id) || [],
      certificates: defaultCertificates.map((cert: TherapistCertificate) => ({
        title: cert.title,
        issuer: cert.issuer,
        issued_date: cert.issued_date
          ? new Date(cert.issued_date).toISOString().split("T")[0]
          : "",
        file: undefined,
        existing_file_url: cert.file_url,
      })),
    };
  }, [therapist, rawDefaultCertificates]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProfessionalInfoFormValues>({
    resolver: zodResolver(
      professionalInfoSchema
    ) as Resolver<ProfessionalInfoFormValues>,
    values: defaultValues as ProfessionalInfoFormValues,
    defaultValues: {
      specialization_ids: [],
      certificates: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificates",
  });

  const onSubmit = async (data: ProfessionalInfoFormValues) => {
    if (!therapist) {
      toast.error("Therapist profile not found. Please contact support.");
      return;
    }

    try {
      await updateTherapist.mutateAsync({
        id: therapist.id,
        data: {
          years_of_experience: data.years_of_experience,
          license_number: data.license_number,
          bio: data.bio,
          version: therapist.user.version,
          therapist_version: therapist.version,
        },
      });

      // 2. Create Specializations
      if (data.specialization_ids.length > 0) {
        await Promise.all(
          data.specialization_ids.map((specId) =>
            therapistSpecializationsService.create({
              specialization_id: specId,
            })
          )
        );
      }

      // 3. Create & Upload Certificates
      if (data.certificates && data.certificates.length > 0) {
        await Promise.all(
          data.certificates.map(async (cert) => {
            if (cert.existing_file_url && !cert.file) {
              return;
            }

            const newCert = await createCertificate.mutateAsync({
              title: cert.title,
              issuer: cert.issuer,
              issued_date: new Date(cert.issued_date),
              description: cert.description,
            });

            if (newCert && newCert.id && cert.file) {
              await therapistsCertificatesService.uploadFile(
                cert.file,
                `/${newCert.id}/file`,
                "PATCH"
              );
            }
          })
        );
      }

      toast.success("Professional info saved");
      navigate(ROUTES.THERAPIST.ONBOARDING.SETTINGS);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to save professional info"
        );
      } else {
        console.error(error);
        toast.error("Failed to save professional info");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Professional Information</h2>
        <p className="text-muted-foreground">
          Share your credentials and expertise.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="years_of_experience">Years of Experience</Label>
            <Input
              id="years_of_experience"
              type="number"
              {...register("years_of_experience")}
            />
            {errors.years_of_experience && (
              <p className="text-sm text-destructive">
                {errors.years_of_experience.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="license_number">License Number</Label>
            <Input
              id="license_number"
              placeholder="123456"
              {...register("license_number")}
            />
            {errors.license_number && (
              <p className="text-sm text-destructive">
                {errors.license_number.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Specializations</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border p-4 rounded-md max-h-60 overflow-y-auto">
            <Controller
              name="specialization_ids"
              control={control}
              render={({ field }) => (
                <>
                  {specializations.map((spec) => (
                    <div key={spec.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`spec-${spec.id}`}
                        checked={field.value?.includes(spec.id)}
                        onCheckedChange={(checked) => {
                          const current = field.value || [];
                          const newValue = checked
                            ? [...current, spec.id]
                            : current.filter((id) => id !== spec.id);
                          field.onChange(newValue);
                        }}
                      />
                      <Label
                        htmlFor={`spec-${spec.id}`}
                        className="font-normal cursor-pointer"
                      >
                        {spec.name}
                      </Label>
                    </div>
                  ))}
                </>
              )}
            />
          </div>
          {errors.specialization_ids && (
            <p className="text-sm text-destructive">
              {errors.specialization_ids.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea
            id="bio"
            placeholder="I have been practicing for 8 years..."
            className="h-32"
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-sm text-destructive">{errors.bio.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-base">Certificates</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  title: "",
                  issuer: "",
                  issued_date: "",
                  file: undefined,
                  existing_file_url: "",
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" /> Add Certificate
            </Button>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">Certificate #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      {...register(`certificates.${index}.title`)}
                      placeholder="Certificate Name"
                      disabled={!!field.existing_file_url}
                    />
                    {errors.certificates?.[index]?.title && (
                      <p className="text-sm text-destructive">
                        {errors.certificates[index]?.title?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Issuer</Label>
                    <Input
                      {...register(`certificates.${index}.issuer`)}
                      placeholder="Issuing Organization"
                      disabled={!!field.existing_file_url}
                    />
                    {errors.certificates?.[index]?.issuer && (
                      <p className="text-sm text-destructive">
                        {errors.certificates[index]?.issuer?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Issued Date</Label>
                    <Input
                      type="date"
                      {...register(`certificates.${index}.issued_date`)}
                      disabled={!!field.existing_file_url}
                    />
                    {errors.certificates?.[index]?.issued_date && (
                      <p className="text-sm text-destructive">
                        {errors.certificates[index]?.issued_date?.message}
                      </p>
                    )}
                  </div>

                  {field.existing_file_url ? (
                    <div className="space-y-2">
                      <Label>Existing Certificate File</Label>
                      <FileViewer
                        src={field.existing_file_url}
                        title={field.title}
                        alt={`Certificate: ${field.title}`}
                      />
                    </div>
                  ) : (
                    <FileUpload
                      control={control}
                      name={`certificates.${index}.file`}
                      setValue={setValue}
                      label="Certificate File"
                      error={errors.certificates?.[index]?.file?.message}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              navigate(ROUTES.THERAPIST.ONBOARDING.PERSONAL_DETAILS)
            }
          >
            Back
          </Button>
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
