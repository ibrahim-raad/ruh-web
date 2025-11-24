import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { languagesService } from "./languages.service";
import type { Language } from "../types/language.types";

const languageHooks = createCrudHooks<Language>({
  queryKey: "languages",
  service: languagesService,
  messages: {
    createSuccess: "Language created successfully",
    updateSuccess: "Language updated successfully",
    deleteSuccess: "Language deleted successfully",
    createError: "Failed to create language",
    updateError: "Failed to update language",
    deleteError: "Failed to delete language",
  },
});

export const useLanguages = languageHooks.useList;
export const useLanguage = languageHooks.useGetById;
export const useCreateLanguage = languageHooks.useCreate;
export const useUpdateLanguage = languageHooks.useUpdate;
export const useDeleteLanguage = languageHooks.useDelete;
export const useBulkDeleteLanguages = languageHooks.useBulkDelete;
