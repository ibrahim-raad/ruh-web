import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { sessionsService } from "./sessions.service";
import type { Session } from "../types/session.types";

const sessionHooks = createCrudHooks<Session>({
  queryKey: "sessions",
  service: sessionsService,
  messages: {
    createSuccess: "Session created successfully",
    updateSuccess: "Session updated successfully",
    deleteSuccess: "Session deleted successfully",
    createError: "Failed to create session",
    updateError: "Failed to update session",
    deleteError: "Failed to delete session",
  },
});

export const useSessions = sessionHooks.useList;
export const useSession = sessionHooks.useGetById;
export const useCreateSession = sessionHooks.useCreate;
export const useUpdateSession = sessionHooks.useUpdate;
export const useDeleteSession = sessionHooks.useDelete;
export const useBulkDeleteSessions = sessionHooks.useBulkDelete;
