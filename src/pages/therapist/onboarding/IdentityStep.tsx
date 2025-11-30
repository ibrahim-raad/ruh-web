import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { usersService } from "@/features/users/api/users.service";
import { AxiosError } from "axios";
import { FileUpload } from "@/shared/components/form/FileUpload";

const identitySchema = z.object({
  profile_picture: z
    .any()
    .refine((file) => file instanceof File, "Profile picture is required"),
});

type IdentityFormValues = z.infer<typeof identitySchema>;

export default function IdentityStep() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<IdentityFormValues>({
    resolver: zodResolver(identitySchema),
  });

  const onSubmit = async (data: IdentityFormValues) => {
    if (!user) return;

    try {
      if (data.profile_picture) {
        const updatedUser = await usersService.uploadFile(
          data.profile_picture,
          "/me/profile-image",
          "PATCH"
        );
        setUser(updatedUser);
      }

      toast.success("Identity documents uploaded");
      navigate(ROUTES.THERAPIST.DASHBOARD);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to upload documents"
        );
      } else {
        console.error(error);
        toast.error("Failed to upload documents");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Identity Verification</h2>
        <p className="text-muted-foreground">
          Upload documents to verify your identity.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <FileUpload
              control={control}
              name="profile_picture"
              setValue={setValue}
              label="Profile Picture (Selfie)"
              accept="image/*"
              error={errors.profile_picture?.message as string}
            />
            <p className="text-xs text-muted-foreground">
              Please upload a clear professional photo of yourself.
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(ROUTES.THERAPIST.ONBOARDING.AVAILABILITY)}
          >
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}
