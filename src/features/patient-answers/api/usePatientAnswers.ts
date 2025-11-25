import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { patientAnswersService } from "./patient-answers.service";
import type {
  CreatePatientAnswerDto,
  PatientAnswer,
  UpdatePatientAnswerDto,
} from "../types/patient-answer.types";

const patientAnswersHooks = createCrudHooks<
  PatientAnswer,
  CreatePatientAnswerDto,
  UpdatePatientAnswerDto
>({
  queryKey: "patient-answers",
  service: patientAnswersService,
  messages: {
    createSuccess: "Answer created successfully",
    updateSuccess: "Answer updated successfully",
    deleteSuccess: "Answer deleted successfully",
    createError: "Failed to create answer",
    updateError: "Failed to update answer",
    deleteError: "Failed to delete answer",
  },
});

export const usePatientAnswers = patientAnswersHooks.useList;
export const usePatientAnswer = patientAnswersHooks.useGetById;
export const useCreatePatientAnswer = patientAnswersHooks.useCreate;
export const useUpdatePatientAnswer = patientAnswersHooks.useUpdate;
export const useDeletePatientAnswer = patientAnswersHooks.useDelete;
