import type {
  BaseEntity,
  BackendPaginatedResponse,
  PaginatedResponse,
  ListQueryParams,
} from "../types/api.types";
import { api } from "./client";
import { createListQueryString } from "../utils/query-params";

function transformPaginatedResponse<T>(
  backendResponse: BackendPaginatedResponse<T>,
  params: ListQueryParams
): PaginatedResponse<T> {
  return {
    data: backendResponse.items,
    meta: {
      offset: params.offset ?? 0,
      limit: params.limit ?? 10,
      total: backendResponse.total,
      hasNext: backendResponse.hasNext,
    },
  };
}

export function createCrudService<
  T extends BaseEntity,
  CreateDto = Omit<T, keyof BaseEntity>,
  UpdateDto = Partial<CreateDto> & { version: number },
>(resourcePath: string, pathPrefix: string = "/api/v1") {
  return {
    async getAll(params: ListQueryParams = {}): Promise<PaginatedResponse<T>> {
      const queryString = createListQueryString(params);
      const response = await api.get<BackendPaginatedResponse<T>>(
        `${pathPrefix}${resourcePath}${queryString}`
      );
      return transformPaginatedResponse(response.data, params);
    },

    async getById(id: string): Promise<T> {
      const response = await api.get<T>(`${pathPrefix}${resourcePath}/${id}`);
      return response.data;
    },

    async create(data: CreateDto): Promise<T> {
      const response = await api.post<T>(`${pathPrefix}${resourcePath}`, data);
      return response.data;
    },

    async update(id: string, data: UpdateDto): Promise<T> {
      const response = await api.patch<T>(
        `${pathPrefix}${resourcePath}/${id}`,
        data
      );
      return response.data;
    },

    async softDelete(id: string): Promise<void> {
      await api.delete(`${pathPrefix}${resourcePath}/${id}`);
    },

    async permanentDelete(id: string): Promise<void> {
      await api.delete(`${pathPrefix}${resourcePath}/permanent/${id}`);
    },

    async bulkDelete(ids: string[]): Promise<void> {
      await api.post(`${pathPrefix}${resourcePath}/bulk-delete`, { ids });
    },

    async uploadFile(
      file: File,
      suffixPath: string,
      method: "POST" | "PATCH" = "POST"
    ): Promise<T> {
      const formData = new FormData();
      formData.append("file", file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const url = `${pathPrefix}${resourcePath}${suffixPath}`;

      const response =
        method === "POST"
          ? await api.post(url, formData, config)
          : await api.patch(url, formData, config);

      return response.data;
    },

    async deleteFile(suffixPath: string): Promise<T> {
      const url = `${pathPrefix}${resourcePath}${suffixPath}`;
      const response = await api.delete<T>(url);
      return response.data;
    },
  };
}
