import type { BaseEntity } from "@/shared/types/api.types";

export interface TherapistSettings extends BaseEntity {
  readonly therapist_id: string;
  readonly is_open: boolean; // if true, the schedule is open for anytime booking
  readonly booking_threshold_hours: number;
  readonly max_booking_days: number; // the maximum number of days in advance that the patient can book the appointment
  readonly max_sessions_per_day: number;
  readonly session_duration_minutes: number;
  readonly timezone: string; // IANA timezone string
}

export type CreateTherapistSettingsDto = Omit<
  TherapistSettings,
  keyof BaseEntity | "therapist_id"
>;

export type UpdateTherapistSettingsDto = Partial<CreateTherapistSettingsDto> & {
  version: number;
};
