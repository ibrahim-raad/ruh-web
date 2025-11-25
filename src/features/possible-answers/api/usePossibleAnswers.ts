import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { possibleAnswersService } from "./possible-answers.service";
import type {
  CreatePossibleAnswerDto,
  PossibleAnswer,
  UpdatePossibleAnswerDto,
} from "../types/possible-answer.types";

const possibleAnswersHooks = createCrudHooks<
  PossibleAnswer,
  CreatePossibleAnswerDto,
  UpdatePossibleAnswerDto
>({
  queryKey: "possible-answers",
  service: possibleAnswersService,
  messages: {
    createSuccess: "Answer created successfully",
    updateSuccess: "Answer updated successfully",
    deleteSuccess: "Answer deleted successfully",
  },
});

export const usePossibleAnswers = possibleAnswersHooks.useList;
export const usePossibleAnswer = possibleAnswersHooks.useGetById;
export const useCreatePossibleAnswer = possibleAnswersHooks.useCreate;
export const useUpdatePossibleAnswer = possibleAnswersHooks.useUpdate;
export const useDeletePossibleAnswer = possibleAnswersHooks.useDelete;
