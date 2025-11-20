import type {
  BaseEntity,
  PaginatedResponse,
  ListQueryParams,
} from "../types/api.types";
import { api } from "./client";
import { createListQueryString } from "../utils/query-params";

export function createCrudService<T extends BaseEntity>(resourcePath: string) {
  return {
    async getAll(params: ListQueryParams = {}): Promise<PaginatedResponse<T>> {
      const queryString = createListQueryString(params);
      const response = await api.get<PaginatedResponse<T>>(
        `${resourcePath}${queryString}`
      );
      return response.data;
    },

    async getById(id: string): Promise<T> {
      const response = await api.get<T>(`${resourcePath}/${id}`);
      return response.data;
    },

    async create(data: Omit<T, keyof BaseEntity>): Promise<T> {
      const response = await api.post<T>(resourcePath, data);
      return response.data;
    },

    async update(
      id: string,
      data: Partial<Omit<T, keyof BaseEntity>>
    ): Promise<T> {
      const response = await api.patch<T>(`${resourcePath}/${id}`, data);
      return response.data;
    },

    async delete(id: string): Promise<void> {
      await api.delete(`${resourcePath}/${id}`);
    },

    async permanentDelete(id: string): Promise<void> {
      await api.delete(`${resourcePath}/${id}/permanent`);
    },

    async bulkDelete(ids: string[]): Promise<void> {
      await api.post(`${resourcePath}/bulk-delete`, { ids });
    },
  };
}
