import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { usersService } from "./users.service";
import type { User } from "../types/user.types";

const userHooks = createCrudHooks<User>({
  queryKey: "users",
  service: usersService,
  messages: {
    createSuccess: "User created successfully",
    updateSuccess: "User updated successfully",
    deleteSuccess: "User deleted successfully",
    createError: "Failed to create user",
    updateError: "Failed to update user",
    deleteError: "Failed to delete user",
  },
});

export const useUsers = userHooks.useList;
export const useUser = userHooks.useGetById;
export const useCreateUser = userHooks.useCreate;
export const useUpdateUser = userHooks.useUpdate;
export const useDeleteUser = userHooks.useDelete;
export const useBulkDeleteUsers = userHooks.useBulkDelete;
