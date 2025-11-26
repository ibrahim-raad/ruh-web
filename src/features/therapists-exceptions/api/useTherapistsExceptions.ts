import { createCrudHooks } from "@/shared/hooks/useCrudQuery";

import type { TherapistException } from "../types/therapist-exception.types";
import { therapistsExceptionsService } from "./therapists-exceptions.service";

const therapistExceptionHooks = createCrudHooks<TherapistException>({
  queryKey: "therapists-exceptions",
  service: therapistsExceptionsService,
  messages: {
    createSuccess: "Therapist Exception created successfully",
    updateSuccess: "Therapist Exception updated successfully",
    deleteSuccess: "Therapist Exception deleted successfully",
    createError: "Failed to create therapist exception",
    updateError: "Failed to update therapist exception",
    deleteError: "Failed to delete therapist exception",
  },
});

export const useTherapistsExceptions = therapistExceptionHooks.useList;
export const useTherapistException = therapistExceptionHooks.useGetById;
export const useCreateTherapistException = therapistExceptionHooks.useCreate;
export const useUpdateTherapistException = therapistExceptionHooks.useUpdate;
export const useDeleteTherapistException = therapistExceptionHooks.useDelete;
