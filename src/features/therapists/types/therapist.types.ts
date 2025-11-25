import type { Currency } from "@/features/currencies/types/currency.types";
import type { Specialization } from "@/features/specializations/types/specialization.types";
import type { User } from "@/features/users/types/user.types";
import type { BaseEntity } from "@/shared/types/api.types";

export interface Therapist extends BaseEntity {
  user: User;
  userId: string;
  bio?: string;
  years_of_experience?: number;
  rate_per_hour?: number;
  currency?: Currency;
  currencyId?: string;
  is_psychiatrist: boolean;
  license_number?: string;
  license_expiration_date?: Date;
  payment_provider_account_id?: string;
  payout_method_status: PayoutMethodStatus;
  balance_collected?: number;
  balance_available?: number;
  specializations?: Specialization[];
}

export enum PayoutMethodStatus {
  VERIFIED = "VERIFIED",
  UNVERIFIED = "UNVERIFIED",
  REJECTED = "REJECTED",
}

export type CreateTherapistDto = Omit<Therapist, keyof BaseEntity>;

export type UpdateTherapistDto = Partial<CreateTherapistDto> & {
  version: number;
};
