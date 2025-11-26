import type { Specialization } from "@/features/specializations/types/specialization.types";
import type { Therapist } from "@/features/therapists/types/therapist.types";
import type { BaseEntity } from "@/shared/types/api.types";

export interface TherapistCertificate extends BaseEntity {
  readonly file_url: string;
  readonly title: string;
  readonly issuer: string;
  readonly issued_date: Date;
  readonly description?: string;
  readonly specialization_id?: string;
  readonly therapist_id?: string;
  readonly therapist?: Therapist;
  readonly specialization?: Specialization;
}

export type CreateTherapistCertificateDto = Omit<
  TherapistCertificate,
  | keyof BaseEntity
  | "therapist"
  | "specialization"
  | "therapist_id"
  | "file_url"
>;

export type UpdateTherapistCertificateDto =
  Partial<CreateTherapistCertificateDto> & {
    version: number;
  };
