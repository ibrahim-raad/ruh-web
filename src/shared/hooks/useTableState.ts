import { useState, useCallback, useMemo } from "react";
import type { ListQueryParams } from "../types/api.types";
import { useDebounce } from "./useDebounce";

export interface UseTableStateReturn {
  offset: number;
  limit: number;
  currentPage: number;
  search: string;
  sort?: string;
  filters: Record<string, string | number | boolean | string[]>;
  searchField?: string;

  debouncedSearch: string;

  setOffset: (offset: number) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string) => void;
  setSort: (sort?: string) => void;
  setFilter: (key: string, value: string | number | boolean | string[]) => void;
  clearFilter: (key: string) => void;
  clearAllFilters: () => void;
  reset: () => void;

  queryParams: ListQueryParams;
}

export interface UseTableStateOptions {
  initialOffset?: number;
  initialLimit?: number;
  initialSearch?: string;
  initialSort?: string;
  initialFilters?: Record<string, string | number | boolean | string[]>;
  searchField?: string;
  searchDebounceMs?: number;
  resetPageOnChange?: boolean;
}

export function useTableState(
  options: UseTableStateOptions = {}
): UseTableStateReturn {
  const {
    initialOffset = 0,
    initialLimit = 10,
    initialSearch = "",
    initialSort,
    initialFilters = {},
    searchField,
    searchDebounceMs = 500,
    resetPageOnChange = true,
  } = options;

  const [offset, setOffsetState] = useState(initialOffset);
  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState<string | undefined>(initialSort);
  const [filters, setFilters] =
    useState<Record<string, string | number | boolean | string[]>>(
      initialFilters
    );

  const debouncedSearch = useDebounce(search, searchDebounceMs);

  const currentPage = Math.floor(offset / limit) + 1;

  const setOffset = useCallback((newOffset: number) => {
    setOffsetState(newOffset);
  }, []);

  const setPage = useCallback(
    (page: number) => {
      const newOffset = (page - 1) * limit;
      setOffsetState(newOffset);
    },
    [limit]
  );

  const handleSetLimit = useCallback(
    (newLimit: number) => {
      setLimit(newLimit);
      if (resetPageOnChange) {
        setOffsetState(0);
      }
    },
    [resetPageOnChange]
  );

  const handleSetSearch = useCallback(
    (newSearch: string) => {
      setSearch(newSearch);
      if (resetPageOnChange) {
        setOffsetState(0);
      }
    },
    [resetPageOnChange]
  );

  const handleSetSort = useCallback(
    (newSort?: string) => {
      setSort(newSort);
      if (resetPageOnChange) {
        setOffsetState(0);
      }
    },
    [resetPageOnChange]
  );

  const setFilter = useCallback(
    (key: string, value: string | number | boolean | string[]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      if (resetPageOnChange) {
        setOffsetState(0);
      }
    },
    [resetPageOnChange]
  );

  const clearFilter = useCallback((key: string) => {
    setFilters((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setOffsetState(0);
  }, []);

  const reset = useCallback(() => {
    setOffsetState(initialOffset);
    setLimit(initialLimit);
    setSearch(initialSearch);
    setSort(initialSort);
    setFilters(initialFilters);
  }, [initialOffset, initialLimit, initialSearch, initialSort, initialFilters]);

  const queryParams = useMemo<ListQueryParams>(() => {
    const params: ListQueryParams = {
      offset,
      limit,
      ...filters,
    };

    if (sort) {
      params.sort = sort;
    }

    if (searchField && debouncedSearch) {
      params[searchField] = debouncedSearch;
    }

    return params;
  }, [offset, limit, debouncedSearch, sort, filters, searchField]);

  return {
    offset,
    limit,
    currentPage,
    search,
    sort,
    filters,
    searchField,
    debouncedSearch,
    setOffset,
    setPage,
    setLimit: handleSetLimit,
    setSearch: handleSetSearch,
    setSort: handleSetSort,
    setFilter,
    clearFilter,
    clearAllFilters,
    reset,
    queryParams,
  };
}
