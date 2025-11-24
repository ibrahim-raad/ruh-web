import { createCrudService } from "@/shared/api/base-crud.service";
import type { Language } from "../types/language.types";

export const languagesService = createCrudService<Language>("/languages");
