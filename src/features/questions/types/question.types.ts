import type { BaseEntity } from "@/shared/types/api.types";

export interface Question extends BaseEntity {
  questionnaire_id: string;
  question: string;
  type: QuestionType;
  order: number;
}

export enum QuestionType {
  TEXT = "TEXT",
  SCALE = "SCALE",
  MULTIPLE_SELECT = "MULTIPLE_SELECT",
  SINGLE_SELECT = "SINGLE_SELECT",
}

export type CreateQuestionDto = Omit<Question, keyof BaseEntity>;

export type UpdateQuestionDto = Partial<CreateQuestionDto> & {
  version: number;
};
