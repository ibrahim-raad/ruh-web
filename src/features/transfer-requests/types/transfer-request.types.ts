import type { BaseEntity } from "@/shared/types/api.types";
import type { Therapist } from "@/features/therapists/types/therapist.types";
import type { Patient } from "@/features/patients/types/patient.types";
import type { TherapyCase } from "@/features/therapy-cases/types/therapy-case.types";

export enum TherapistTransferRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export interface TherapistTransferRequest extends BaseEntity {
  transfer_reason: string;
  status_reason?: string;
  status: TherapistTransferRequestStatus;
  therapist: Therapist;
  therapistId: string;
  patient: Patient;
  patientId: string;
  from_therapy_case?: TherapyCase;
  from_therapy_caseId?: string;
}

export interface UpdateTransferRequestDto {
  status: TherapistTransferRequestStatus;
  status_reason?: string;
  version: number;
}
