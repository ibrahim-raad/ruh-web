import { createCrudService } from "@/shared/api/base-crud.service";
import type { BaseEntity } from "@/shared/types/api.types";

export interface TherapistSpecialization extends BaseEntity {
  therapist_id: string;
  specialization_id: string;
}

export interface CreateTherapistSpecializationDto {
  specialization_id: string;
}

export const therapistSpecializationsService = createCrudService<
  TherapistSpecialization,
  CreateTherapistSpecializationDto
>("/therapists-specializations");
