import { createCrudService } from "@/shared/api/base-crud.service";
import type {
  CreateQuestionnaireDto,
  Questionnaire,
  UpdateQuestionnaireDto,
} from "../types/questionnaire.types";

export const questionnairesService = createCrudService<
  Questionnaire,
  CreateQuestionnaireDto,
  UpdateQuestionnaireDto
>("/questionnaires");
