import { createCrudService } from "@/shared/api/base-crud.service";
import type {
  CreateTherapistCertificateDto,
  TherapistCertificate,
  UpdateTherapistCertificateDto,
} from "../types/therapist-certificate.types";

export const therapistsCertificatesService = createCrudService<
  TherapistCertificate,
  CreateTherapistCertificateDto,
  UpdateTherapistCertificateDto
>("/therapists-certificates");
