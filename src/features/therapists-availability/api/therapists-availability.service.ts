import { createCrudService } from "@/shared/api/base-crud.service";
import type { TherapistAvailability } from "../types/therapist-availability.types";

export const therapistsAvailabilityService =
  createCrudService<TherapistAvailability>("/therapists-availability");
