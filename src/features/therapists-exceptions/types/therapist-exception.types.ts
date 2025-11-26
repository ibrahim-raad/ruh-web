import type { BaseEntity } from "@/shared/types/api.types";

export interface TherapistException extends BaseEntity {
  readonly therapist_id: string;
  readonly start_time: string; // HH:MM
  readonly end_time: string;
  readonly date: Date;
  readonly is_available: boolean;
  readonly reason?: string;
}

export type CreateTherapistExceptionDto = Omit<
  TherapistException,
  keyof BaseEntity | "therapist_id"
>;

export type UpdateTherapistExceptionDto =
  Partial<CreateTherapistExceptionDto> & {
    version: number;
  };
