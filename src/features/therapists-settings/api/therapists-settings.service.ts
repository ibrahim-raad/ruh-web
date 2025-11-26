import { createCrudService } from "@/shared/api/base-crud.service";
import type { TherapistSettings } from "../types/therapist-settings.types";

export const therapistsSettingsService = createCrudService<TherapistSettings>(
  "/therapists-settings"
);
