import { createCrudService } from "@/shared/api/base-crud.service";
import type { Currency } from "../types/currency.types";

export const currenciesService = createCrudService<Currency>("/currencies");
