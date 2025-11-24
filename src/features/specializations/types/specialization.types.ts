import type { BaseEntity } from "@/shared/types/api.types";

export interface Specialization extends BaseEntity {
  name: string;
  description?: string;
}

export type CreateSpecializationDto = Omit<Specialization, keyof BaseEntity>;

export type UpdateSpecializationDto = Partial<CreateSpecializationDto> & {
  version: number;
};
