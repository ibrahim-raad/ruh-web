import {
  createCrudService,
  transformPaginatedResponse,
} from "@/shared/api/base-crud.service";
import type {
  CreateTherapistCertificateDto,
  TherapistCertificate,
  UpdateTherapistCertificateDto,
} from "../types/therapist-certificate.types";
import { api } from "@/shared/api/client";
import type {
  BackendPaginatedResponse,
  PaginatedResponse,
} from "@/shared/types/api.types";

export const baseTherapistsCertificatesService = createCrudService<
  TherapistCertificate,
  CreateTherapistCertificateDto,
  UpdateTherapistCertificateDto
>("/therapists-certificates");

export const therapistsCertificatesService = {
  ...baseTherapistsCertificatesService,
  myCertificates: async (): Promise<
    PaginatedResponse<TherapistCertificate>
  > => {
    const response = await api.get<
      BackendPaginatedResponse<TherapistCertificate>
    >("/api/v1/therapists-certificates/mine");
    return transformPaginatedResponse<TherapistCertificate>(response.data, {
      offset: 0,
      limit: 100,
    });
  },
};
