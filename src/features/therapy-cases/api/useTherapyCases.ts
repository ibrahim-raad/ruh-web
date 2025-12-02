import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { therapyCasesService } from "./therapy-cases.service";
import type { TherapyCase } from "../types/therapy-case.types";

const therapyCaseHooks = createCrudHooks<TherapyCase>({
  queryKey: "therapy-cases",
  service: therapyCasesService,
});

export const useTherapyCases = therapyCaseHooks.useList;
export const useTherapyCase = therapyCaseHooks.useGetById;
export const useUpdateTherapyCase = therapyCaseHooks.useUpdate;
