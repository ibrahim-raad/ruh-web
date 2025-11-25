import type { BaseEntity } from "@/shared/types/api.types";
import type { Question } from "@/features/questions/types/question.types";
import type { PossibleAnswer } from "@/features/possible-answers/types/possible-answer.types";
import type { User } from "@/features/users/types/user.types";

export interface PatientAnswer extends BaseEntity {
  answer?: string;
  question?: Question;
  question_id?: string;
  possible_answer?: PossibleAnswer;
  possible_answer_id?: string;
  patient?: User;
  patient_id: string;
}

export type CreatePatientAnswerDto = Omit<PatientAnswer, keyof BaseEntity>;

export type UpdatePatientAnswerDto = Partial<CreatePatientAnswerDto> & {
  version: number;
};
