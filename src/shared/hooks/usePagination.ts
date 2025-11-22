import { useState, useCallback } from "react";
import type { PaginationMeta } from "../types/api.types";

export interface UsePaginationReturn {
  offset: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  reset: () => void;
}

export interface UsePaginationOptions {
  initialOffset?: number;
  initialLimit?: number;
  onOffsetChange?: (offset: number) => void;
  onLimitChange?: (limit: number) => void;
}

export function usePagination(
  meta?: PaginationMeta,
  options: UsePaginationOptions = {}
): UsePaginationReturn {
  const {
    initialOffset = 0,
    initialLimit = 10,
    onOffsetChange,
    onLimitChange,
  } = options;

  const [offset, setOffsetState] = useState(initialOffset);
  const [limit, setLimitState] = useState(initialLimit);

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = meta ? Math.ceil(meta.total / limit) : 0;

  const setOffset = useCallback(
    (newOffset: number) => {
      setOffsetState(newOffset);
      onOffsetChange?.(newOffset);
    },
    [onOffsetChange]
  );

  const setPage = useCallback(
    (page: number) => {
      const newOffset = (page - 1) * limit;
      setOffset(newOffset);
    },
    [limit, setOffset]
  );

  const setLimit = useCallback(
    (newLimit: number) => {
      setLimitState(newLimit);
      setOffsetState(0);
      onLimitChange?.(newLimit);
    },
    [onLimitChange]
  );

  const goToNextPage = useCallback(() => {
    if (meta?.hasNext) {
      setOffset(offset + limit);
    }
  }, [offset, limit, meta?.hasNext, setOffset]);

  const goToPreviousPage = useCallback(() => {
    if (offset > 0) {
      setOffset(Math.max(0, offset - limit));
    }
  }, [offset, limit, setOffset]);

  const goToFirstPage = useCallback(() => {
    setOffset(0);
  }, [setOffset]);

  const goToLastPage = useCallback(() => {
    if (meta) {
      const lastPageOffset = Math.max(
        0,
        Math.floor((meta.total - 1) / limit) * limit
      );
      setOffset(lastPageOffset);
    }
  }, [meta, limit, setOffset]);

  const reset = useCallback(() => {
    setOffsetState(initialOffset);
    setLimitState(initialLimit);
  }, [initialOffset, initialLimit]);

  return {
    offset,
    limit,
    currentPage,
    totalPages,
    setOffset,
    setLimit,
    setPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    canGoNext: meta?.hasNext ?? false,
    canGoPrevious: offset > 0,
    reset,
  };
}
