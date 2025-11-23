import type { BaseEntity } from "@/shared/types/api.types";

export interface Country extends BaseEntity {
  name: string;
}

export type CreateCountryDto = Omit<Country, keyof BaseEntity>;

export type UpdateCountryDto = Partial<CreateCountryDto> & {
  version: number;
};
