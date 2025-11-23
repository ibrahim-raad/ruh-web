import type { Country } from "@/features/countries/types/country.types";
import type { BaseEntity } from "@/shared/types/api.types";

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
  UNKNOWN = "UNKNOWN",
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
  gender: UserGender;
  email_status: UserEmailStatus;
  country?: Country;
  countryId?: string;
  date_of_birth?: string;
  profile_url?: string;
}

export interface LoginResponse {
  tokens: Tokens;
  user: User;
}

export interface Tokens {
  access_token?: string;
  refresh_token?: string;
}

export interface RefreshTokenResponse {
  access_token: string;
}
