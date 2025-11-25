import { createCrudService } from "@/shared/api/base-crud.service";
import type {
  CreatePossibleAnswerDto,
  PossibleAnswer,
  UpdatePossibleAnswerDto,
} from "../types/possible-answer.types";

export const possibleAnswersService = createCrudService<
  PossibleAnswer,
  CreatePossibleAnswerDto,
  UpdatePossibleAnswerDto
>("/possible-answers");
