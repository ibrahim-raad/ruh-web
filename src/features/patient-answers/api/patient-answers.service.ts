import { createCrudService } from "@/shared/api/base-crud.service";
import type { PatientAnswer } from "../types/patient-answer.types";

export const patientAnswersService =
  createCrudService<PatientAnswer>("/patient-answers");
