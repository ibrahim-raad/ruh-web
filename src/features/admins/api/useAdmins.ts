import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { adminsService } from "./admins.service";
import type {
  Admin,
  CreateAdminDto,
  UpdateAdminDto,
} from "../types/admin.types";

const adminHooks = createCrudHooks<Admin, CreateAdminDto, UpdateAdminDto>({
  queryKey: "admins",
  service: adminsService,
  messages: {
    createSuccess: "Admin created successfully",
    updateSuccess: "Admin updated successfully",
    deleteSuccess: "Admin deleted successfully",
    createError: "Failed to create admin",
    updateError: "Failed to update admin",
    deleteError: "Failed to delete admin",
  },
});

export const useAdmins = adminHooks.useList;
export const useAdmin = adminHooks.useGetById;
export const useCreateAdmin = adminHooks.useCreate;
export const useUpdateAdmin = adminHooks.useUpdate;
export const useDeleteAdmin = adminHooks.useDelete;
export const useBulkDeleteAdmins = adminHooks.useBulkDelete;
