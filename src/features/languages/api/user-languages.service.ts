import { api } from "@/shared/api/client";

export interface CreateUserLanguageDto {
  language_id: string;
  is_primary: boolean;
}

const apiVersion = "/api/v1";

export const userLanguagesService = {
  create: async (data: CreateUserLanguageDto): Promise<void> => {
    await api.post(`${apiVersion}/users-spoken-languages`, data);
  },
};
