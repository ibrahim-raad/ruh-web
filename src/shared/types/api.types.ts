export interface BaseEntity {
  id: string;
  version: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  offset: number;
  limit: number;
  total: number;
  hasNext: boolean;
}

export interface PaginationParams {
  offset?: number;
  limit?: number;
  sort?: string;
}

export interface SearchParams {
  search?: string;
  searchFields?: string[];
}

export interface FilterParams {
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface ListQueryParams
  extends PaginationParams,
    SearchParams,
    FilterParams {}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  details?: unknown;
}

export interface ApiSuccessResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}
