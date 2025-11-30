import type { BaseEntity } from "@/shared/types/api.types";

import type { Country } from "@/features/countries/types/country.types";
import type { Language } from "@/features/languages/types/language.types";

export enum UserRole {
  ADMIN = "ADMIN",
  THERAPIST = "THERAPIST",
  PATIENT = "PATIENT",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  BLOCKED = "BLOCKED",
}

export enum UserGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum UserEmailStatus {
  VERIFIED = "VERIFIED",
  UNVERIFIED = "UNVERIFIED",
}

export interface User extends BaseEntity {
  full_name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  gender?: UserGender;
  email_status: UserEmailStatus;
  country?: Country;
  country_id?: string;
  date_of_birth?: Date;
  profile_url?: string;
  spoken_languages?: (Language & { is_primary: boolean })[];
}

export type CreateUserDto = Omit<User, keyof BaseEntity>;

export type UpdateUserDto = Partial<CreateUserDto> & {
  version: number;
};
