import { createCrudService } from "@/shared/api/base-crud.service";
import type { TherapyCase } from "../types/therapy-case.types";

export const therapyCasesService =
  createCrudService<TherapyCase>("/therapy-cases");
