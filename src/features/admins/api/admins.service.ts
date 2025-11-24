import { createCrudService } from "@/shared/api/base-crud.service";
import type {
  Admin,
  CreateAdminDto,
  UpdateAdminDto,
} from "../types/admin.types";

export const adminsService = createCrudService<
  Admin,
  CreateAdminDto,
  UpdateAdminDto
>("/admins");
