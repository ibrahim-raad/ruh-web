import { createCrudService } from "@/shared/api/base-crud.service";
import type { Specialization } from "../types/specialization.types";

export const specializationsService =
  createCrudService<Specialization>("/specializations");
