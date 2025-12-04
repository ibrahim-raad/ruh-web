import { createCrudService } from "@/shared/api/base-crud.service";
import type { Session } from "../types/session.types";

export const sessionsService = createCrudService<Session>("/sessions");
