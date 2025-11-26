import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { therapistsService } from "./therapists.service";
import type {
  CreateTherapistDto,
  Therapist,
  UpdateTherapistDto,
} from "../types/therapist.types";
import { useQuery } from "@tanstack/react-query";

const therapistHooks = createCrudHooks<
  Therapist,
  CreateTherapistDto,
  UpdateTherapistDto
>({
  queryKey: "therapists",
  service: therapistsService,
  messages: {
    createSuccess: "Therapist created successfully",
    updateSuccess: "Therapist updated successfully",
    deleteSuccess: "Therapist deleted successfully",
    createError: "Failed to create therapist",
    updateError: "Failed to update therapist",
    deleteError: "Failed to delete therapist",
  },
});

export const useTherapists = therapistHooks.useList;
export const useTherapist = therapistHooks.useGetById;
export const useCreateTherapist = therapistHooks.useCreate;
export const useUpdateTherapist = therapistHooks.useUpdate;
export const useDeleteTherapist = therapistHooks.useDelete;
export const useBulkDeleteTherapists = therapistHooks.useBulkDelete;
export const useTherapistMe = () =>
  useQuery({
    queryKey: ["therapist"],
    queryFn: () => therapistsService.getMe(),
  });
