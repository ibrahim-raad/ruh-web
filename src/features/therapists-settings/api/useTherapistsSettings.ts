import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { therapistsSettingsService } from "./therapists-settings.service";
import type { TherapistSettings } from "../types/therapist-settings.types";

const therapistSettingsHooks = createCrudHooks<TherapistSettings>({
  queryKey: "therapists-settings",
  service: therapistsSettingsService,
  messages: {
    updateSuccess: "TherapistSettings updated successfully",
    deleteSuccess: "TherapistSettings deleted successfully",
    updateError: "Failed to update therapist setting",
    deleteError: "Failed to delete therapist setting",
  },
});

export const useTherapistsSettings = therapistSettingsHooks.useList;
export const useTherapistSettings = therapistSettingsHooks.useGetById;
export const useUpdateTherapistSettings = therapistSettingsHooks.useUpdate;
export const useDeleteTherapistSettings = therapistSettingsHooks.useDelete;
