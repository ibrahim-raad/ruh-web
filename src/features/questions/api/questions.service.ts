import { createCrudService } from "@/shared/api/base-crud.service";
import type {
  CreateQuestionDto,
  Question,
  UpdateQuestionDto,
} from "../types/question.types";

export const questionsService = createCrudService<
  Question,
  CreateQuestionDto,
  UpdateQuestionDto
>("/questions");
