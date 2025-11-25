import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { questionsService } from "./questions.service";
import type {
  CreateQuestionDto,
  Question,
  UpdateQuestionDto,
} from "../types/question.types";

const questionsHooks = createCrudHooks<
  Question,
  CreateQuestionDto,
  UpdateQuestionDto
>({
  queryKey: "questions",
  service: questionsService,
  messages: {
    createSuccess: "Question created successfully",
    updateSuccess: "Question updated successfully",
    deleteSuccess: "Question deleted successfully",
  },
});

export const useQuestions = questionsHooks.useList;
export const useQuestion = questionsHooks.useGetById;
export const useCreateQuestion = questionsHooks.useCreate;
export const useUpdateQuestion = questionsHooks.useUpdate;
export const useDeleteQuestion = questionsHooks.useDelete;
