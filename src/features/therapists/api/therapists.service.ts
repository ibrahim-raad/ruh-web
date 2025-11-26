import { createCrudService } from "@/shared/api/base-crud.service";
import { api } from "@/shared/api/client";
import type { Therapist } from "../types/therapist.types";

const baseService = createCrudService<Therapist>("/therapists");

export const therapistsService = {
  ...baseService,
  getMe: async (): Promise<Therapist> => {
    const response = await api.get<Therapist>("/api/v1/therapists/me");
    return response.data;
  },
};
