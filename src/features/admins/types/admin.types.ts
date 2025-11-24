import type { CreateUserDto, User } from "@/features/users/types/user.types";
import type { BaseEntity } from "@/shared/types/api.types";

export interface Admin extends BaseEntity {
  admin_role: AdminRole;
  user: User;
  user_id?: string;
}

export enum AdminRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  REVIEWER = "REVIEWER",
  CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT",
}

export type CreateAdminDto = CreateUserDto & {
  admin_role: AdminRole;
};

export type UpdateAdminDto = Partial<CreateAdminDto> & {
  version: number;
  admin_version: number;
};
