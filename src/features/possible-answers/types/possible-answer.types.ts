import type { BaseEntity } from "@/shared/types/api.types";

export interface PossibleAnswer extends BaseEntity {
  question_id: string;
  answer: string;
  order: number;
}

export type CreatePossibleAnswerDto = Omit<PossibleAnswer, keyof BaseEntity>;

export type UpdatePossibleAnswerDto = Partial<CreatePossibleAnswerDto> & {
  version: number;
};
