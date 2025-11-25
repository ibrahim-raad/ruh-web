import type {
  CreateUserDto,
  User,
  UserGender,
} from "@/features/users/types/user.types";
import type { BaseEntity } from "@/shared/types/api.types";

export interface Patient extends BaseEntity {
  user: User;
  user_id: string;
  preferred_therapist_gender: UserGender;
  preferred_therapy_mode: TherapyMode;
}

export enum TherapyMode {
  VIDEO = "VIDEO",
  CHAT = "CHAT",
  BOTH = "BOTH",
}

export type CreatePatientDto = CreateUserDto & {
  preferred_therapist_gender: UserGender;
  preferred_therapy_mode: TherapyMode;
};

export type UpdatePatientDto = Partial<CreatePatientDto> & {
  patient_version: number;
  user_version: number;
};
