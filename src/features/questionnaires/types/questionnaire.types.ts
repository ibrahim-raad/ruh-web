import type { User } from "@/features/users/types/user.types";
import type { BaseEntity } from "@/shared/types/api.types";

export interface Questionnaire extends BaseEntity {
  title: string;
  description?: string;
  type: QuestionnaireType;
  is_active: boolean;
  created_by: User;
  created_by_id: string;
}

export enum QuestionnaireType {
  POST_SESSION = "POST_SESSION",
  ONBOARDING = "ONBOARDING",
  REFLECTION = "REFLECTION",
  FEEDBACK = "FEEDBACK",
}

export type CreateQuestionnaireDto = Omit<
  Questionnaire,
  keyof BaseEntity | "created_by" | "created_by_id"
>;

export type UpdateQuestionnaireDto = Partial<CreateQuestionnaireDto> & {
  version: number;
};
