import { createCrudService } from "@/shared/api/base-crud.service";
import type { TherapistException } from "../types/therapist-exception.types";

export const therapistsExceptionsService =
  createCrudService<TherapistException>("/therapists-exceptions");
