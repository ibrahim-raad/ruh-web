import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { therapistsCertificatesService } from "./therapists-certificates.service";
import type {
  CreateTherapistCertificateDto,
  TherapistCertificate,
  UpdateTherapistCertificateDto,
} from "../types/therapist-certificate.types";

const therapistCertificateHooks = createCrudHooks<
  TherapistCertificate,
  CreateTherapistCertificateDto,
  UpdateTherapistCertificateDto
>({
  queryKey: "therapists-certificates",
  service: therapistsCertificatesService,
  messages: {
    createSuccess: "TherapistCertificate created successfully",
    updateSuccess: "TherapistCertificate updated successfully",
    deleteSuccess: "TherapistCertificate deleted successfully",
    createError: "Failed to create therapist certificate",
    updateError: "Failed to update therapist certificate",
    deleteError: "Failed to delete therapist certificate",
  },
});

export const useTherapistsCertificates = therapistCertificateHooks.useList;
export const useTherapistCertificate = therapistCertificateHooks.useGetById;
export const useCreateTherapistCertificate =
  therapistCertificateHooks.useCreate;
export const useUpdateTherapistCertificate =
  therapistCertificateHooks.useUpdate;
export const useDeleteTherapistCertificate =
  therapistCertificateHooks.useDelete;
export const useBulkDeleteTherapistsCertificates =
  therapistCertificateHooks.useBulkDelete;
