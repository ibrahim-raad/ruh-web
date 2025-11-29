import { createCrudService } from "@/shared/api/base-crud.service";
import type {
  Admin,
  CreateAdminDto,
  UpdateAdminDto,
} from "../types/admin.types";
import { api } from "@/shared/api/client";

const baseService = createCrudService<Admin, CreateAdminDto, UpdateAdminDto>(
  "/admins"
);

export const adminsService = {
  ...baseService,
  getMe: async (): Promise<Admin> => {
    const response = await api.get<Admin>("/api/v1/admins/me");
    return response.data;
  },
};
