import { createCrudService } from "@/shared/api/base-crud.service";
import type { Country } from "../types/country.types";

export const countriesService = createCrudService<Country>("/countries");
