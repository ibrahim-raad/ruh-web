import type { TherapyCase } from "@/features/therapy-cases/types/therapy-case.types";
import type { BaseEntity } from "@/shared/types/api.types";

export interface Session extends BaseEntity {
  therapy_case_id: string;
  therapy_case: TherapyCase;
  start_time: Date;
  end_time: Date;
  actual_start_time?: Date;
  actual_end_time?: Date;
  status: SessionStatus;
  type: SessionType;
  link?: string;
  audio_link?: string;
  patient_feedback?: string;
}

export enum SessionType {
  FIRST = "FIRST",
  FOLLOW_UP = "FOLLOW_UP",
}

export enum SessionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  CONFIRMED = "CONFIRMED",
  MISSED = "MISSED",
  RESCHEDULED = "RESCHEDULED",
}
