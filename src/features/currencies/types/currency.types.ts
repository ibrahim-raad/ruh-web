import type { BaseEntity } from "@/shared/types/api.types";

export interface Currency extends BaseEntity {
  name: string;
  code: string;
  symbol?: string;
}

export type CreateCurrencyDto = Omit<Currency, keyof BaseEntity>;

export type UpdateCurrencyDto = Partial<CreateCurrencyDto> & {
  version: number;
};
