import type { ListQueryParams } from "../types/api.types";

export function buildQueryString(
  params: Record<string, string | number | boolean | string[] | undefined>
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function parseListParams(
  params: ListQueryParams
): Record<string, string | number | boolean | string[] | undefined> {
  const {
    offset = 0,
    limit = 10,
    search,
    searchFields,
    sort,
    ...filters
  } = params;

  return {
    offset,
    limit,
    ...(search && { search }),
    ...(searchFields && { searchFields: searchFields.join(",") }),
    ...(sort && { sort }),
    ...filters,
  };
}

export function createListQueryString(params: ListQueryParams): string {
  const parsed = parseListParams(params);
  return buildQueryString(parsed);
}
