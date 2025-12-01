import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { therapistsAvailabilityService } from "./therapists-availability.service";
import type {
  CreateTherapistAvailabilityDto,
  TherapistAvailability,
  UpdateTherapistAvailabilityDto,
} from "../types/therapist-availability.types";

const therapistAvailabilityHooks = createCrudHooks<
  TherapistAvailability,
  CreateTherapistAvailabilityDto,
  UpdateTherapistAvailabilityDto
>({
  queryKey: "therapists-availability",
  service: therapistsAvailabilityService,
  messages: {
    updateSuccess: "TherapistAvailability updated successfully",
    deleteSuccess: "TherapistAvailability deleted successfully",
    updateError: "Failed to update therapist availability",
    deleteError: "Failed to delete therapist availability",
  },
});

export const useTherapistsAvailability = therapistAvailabilityHooks.useList;
export const useTherapistAvailability = therapistAvailabilityHooks.useGetById;
export const useUpdateTherapistAvailability =
  therapistAvailabilityHooks.useUpdate;
export const useDeleteTherapistAvailability =
  therapistAvailabilityHooks.useDelete;
export const useCreateTherapistAvailability =
  therapistAvailabilityHooks.useCreate;
