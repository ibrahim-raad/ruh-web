import type { BaseEntity } from "@/shared/types/api.types";

export interface TherapistAvailability extends BaseEntity {
  readonly therapist_id: string;
  readonly start_time: string; // HH:MM
  readonly end_time: string;
  readonly day_of_week: DayOfWeek;
  readonly break_start_time: string;
  readonly break_end_time: string;
}

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export type CreateTherapistAvailabilityDto = Omit<
  TherapistAvailability,
  keyof BaseEntity | "therapist_id"
>;

export type UpdateTherapistAvailabilityDto =
  Partial<CreateTherapistAvailabilityDto> & {
    version: number;
  };
