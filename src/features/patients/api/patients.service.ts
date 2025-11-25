import { createCrudService } from "@/shared/api/base-crud.service";
import type { Patient } from "../types/patient.types";

export const patientsService = createCrudService<Patient>("/patients");
