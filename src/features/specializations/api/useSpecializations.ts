import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { specializationsService } from "./specializations.service";
import type { Specialization } from "../types/specialization.types";

const specializationHooks = createCrudHooks<Specialization>({
  queryKey: "specializations",
  service: specializationsService,
  messages: {
    createSuccess: "Specialization created successfully",
    updateSuccess: "Specialization updated successfully",
    deleteSuccess: "Specialization deleted successfully",
    createError: "Failed to create specialization",
    updateError: "Failed to update specialization",
    deleteError: "Failed to delete specialization",
  },
});

export const useSpecializations = specializationHooks.useList;
export const useSpecialization = specializationHooks.useGetById;
export const useCreateSpecialization = specializationHooks.useCreate;
export const useUpdateSpecialization = specializationHooks.useUpdate;
export const useDeleteSpecialization = specializationHooks.useDelete;
export const useBulkDeleteSpecializations = specializationHooks.useBulkDelete;
