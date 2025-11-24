import { createCrudService } from "@/shared/api/base-crud.service";
import type { User } from "../types/user.types";

export const usersService = createCrudService<User>("/users");
