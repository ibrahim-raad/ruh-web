import type { BaseEntity } from "@/shared/types/api.types";
import type { Patient } from "@/features/patients/types/patient.types";
import type { Therapist } from "@/features/therapists/types/therapist.types";

export enum TherapyCaseType {
  THERAPIST = "THERAPIST",
  PSYCHIATRIST = "PSYCHIATRIST",
}

export enum TherapyCaseStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  TRANSFERRED = "TRANSFERRED",
}

export interface TherapyCase extends BaseEntity {
  patient: Patient;
  patientId: string;
  therapist: Therapist;
  therapistId: string;
  transferred_to?: TherapyCase;
  transferred_to_id?: string;
  type: TherapyCaseType;
  status: TherapyCaseStatus;
  first_session_at?: Date;
  last_session_at?: Date;
  total_sessions: number;
  notes?: string;
}
