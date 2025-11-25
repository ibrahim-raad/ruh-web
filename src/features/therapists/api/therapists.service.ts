import { createCrudService } from "@/shared/api/base-crud.service";
import type { Therapist } from "../types/therapist.types";

export const therapistsService = createCrudService<Therapist>("/therapists");
