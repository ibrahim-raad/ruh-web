import { createCrudService } from "@/shared/api/base-crud.service";
import type {
  CreateTherapistAvailabilityDto,
  TherapistAvailability,
  UpdateTherapistAvailabilityDto,
} from "../types/therapist-availability.types";

export const therapistsAvailabilityService = createCrudService<
  TherapistAvailability,
  CreateTherapistAvailabilityDto,
  UpdateTherapistAvailabilityDto
>("/therapists-availability");
