import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { questionnairesService } from "./questionnaires.service";
import type {
  CreateQuestionnaireDto,
  Questionnaire,
  UpdateQuestionnaireDto,
} from "../types/questionnaire.types";

const questionnaireHooks = createCrudHooks<
  Questionnaire,
  CreateQuestionnaireDto,
  UpdateQuestionnaireDto
>({
  queryKey: "questionnaires",
  service: questionnairesService,
  messages: {
    createSuccess: "Questionnaire created successfully",
    updateSuccess: "Questionnaire updated successfully",
    deleteSuccess: "Questionnaire deleted successfully",
    createError: "Failed to create questionnaire",
    updateError: "Failed to update questionnaire",
    deleteError: "Failed to delete questionnaire",
  },
});

export const useQuestionnaires = questionnaireHooks.useList;
export const useQuestionnaire = questionnaireHooks.useGetById;
export const useCreateQuestionnaire = questionnaireHooks.useCreate;
export const useUpdateQuestionnaire = questionnaireHooks.useUpdate;
export const useDeleteQuestionnaire = questionnaireHooks.useDelete;
export const useBulkDeleteQuestionnaires = questionnaireHooks.useBulkDelete;
