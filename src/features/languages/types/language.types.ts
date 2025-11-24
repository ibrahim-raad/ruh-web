import type { BaseEntity } from "@/shared/types/api.types";

export interface Language extends BaseEntity {
  name: string;
  code: string;
}

export type CreateLanguageDto = Omit<Language, keyof BaseEntity>;

export type UpdateLanguageDto = Partial<CreateLanguageDto> & {
  version: number;
};
