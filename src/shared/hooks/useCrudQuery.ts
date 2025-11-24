import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  BaseEntity,
  PaginatedResponse,
  ListQueryParams,
} from "../types/api.types";

export interface CrudQueryOptions<
  T extends BaseEntity,
  CreateDto = Omit<T, keyof BaseEntity>,
  UpdateDto = Partial<CreateDto> & { version: number },
> {
  queryKey: string;
  service: {
    getAll: (params: ListQueryParams) => Promise<PaginatedResponse<T>>;
    getById: (id: string) => Promise<T>;
    create: (data: CreateDto) => Promise<T>;
    update: (id: string, data: UpdateDto) => Promise<T>;
    softDelete: (id: string) => Promise<void>;
    permanentDelete: (id: string) => Promise<void>;
    bulkDelete?: (ids: string[]) => Promise<void>;
  };
  messages?: {
    createSuccess?: string;
    updateSuccess?: string;
    deleteSuccess?: string;
    createError?: string;
    updateError?: string;
    deleteError?: string;
  };
}

export function createCrudHooks<
  T extends BaseEntity,
  CreateDto = Omit<T, keyof BaseEntity>,
  UpdateDto = Partial<CreateDto> & { version: number },
>(options: CrudQueryOptions<T, CreateDto, UpdateDto>) {
  const { queryKey, service, messages } = options;

  function useList(
    params: ListQueryParams = {},
    queryOptions?: Omit<
      UseQueryOptions<PaginatedResponse<T>>,
      "queryKey" | "queryFn"
    >
  ) {
    return useQuery({
      queryKey: [queryKey, "list", params],
      queryFn: () => service.getAll(params),
      ...queryOptions,
    });
  }

  function useGetById(
    id: string,
    queryOptions?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
  ) {
    return useQuery({
      queryKey: [queryKey, "detail", id],
      queryFn: () => service.getById(id),
      enabled: !!id,
      ...queryOptions,
    });
  }

  function useCreate(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, CreateDto>,
      "mutationFn"
    >
  ) {
    const queryClient = useQueryClient();
    const { onSuccess, onError, ...restOptions } = mutationOptions || {};

    return useMutation({
      ...restOptions,
      mutationFn: service.create,
      onSuccess: async (data, variables, onMutateResult, context) => {
        queryClient.invalidateQueries({ queryKey: [queryKey, "list"] });
        toast.success(messages?.createSuccess || "Created successfully");
        await onSuccess?.(data, variables, onMutateResult, context);
      },
      onError: async (error, variables, onMutateResult, context) => {
        toast.error(
          messages?.createError || error.message || "Failed to create"
        );
        await onError?.(error, variables, onMutateResult, context);
      },
    });
  }

  function useUpdate(
    mutationOptions?: Omit<
      UseMutationOptions<
        T,
        Error,
        {
          id: string;
          data: UpdateDto;
        }
      >,
      "mutationFn"
    >
  ) {
    const queryClient = useQueryClient();
    const { onSuccess, onError, ...restOptions } = mutationOptions || {};

    return useMutation({
      ...restOptions,
      mutationFn: ({ id, data }) => service.update(id, data),
      onSuccess: async (data, variables, onMutateResult, context) => {
        queryClient.invalidateQueries({ queryKey: [queryKey, "list"] });
        queryClient.invalidateQueries({
          queryKey: [queryKey, "detail", variables.id],
        });
        toast.success(messages?.updateSuccess || "Updated successfully");
        await onSuccess?.(data, variables, onMutateResult, context);
      },
      onError: async (error, variables, onMutateResult, context) => {
        toast.error(
          messages?.updateError || error.message || "Failed to update"
        );
        await onError?.(error, variables, onMutateResult, context);
      },
    });
  }

  function useDelete(
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, string>,
      "mutationFn"
    >
  ) {
    const queryClient = useQueryClient();
    const { onSuccess, onError, ...restOptions } = mutationOptions || {};

    return useMutation({
      ...restOptions,
      mutationFn: service.permanentDelete,
      onSuccess: async (data, variables, onMutateResult, context) => {
        queryClient.invalidateQueries({ queryKey: [queryKey, "list"] });
        queryClient.removeQueries({
          queryKey: [queryKey, "detail", variables],
        });
        toast.success(messages?.deleteSuccess || "Deleted successfully");
        await onSuccess?.(data, variables, onMutateResult, context);
      },
      onError: async (error, variables, onMutateResult, context) => {
        toast.error(
          messages?.deleteError || error.message || "Failed to delete"
        );
        await onError?.(error, variables, onMutateResult, context);
      },
    });
  }

  function useBulkDelete(
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, string[]>,
      "mutationFn"
    >
  ) {
    const queryClient = useQueryClient();
    const { onSuccess, onError, ...restOptions } = mutationOptions || {};

    return useMutation({
      ...restOptions,
      mutationFn: (ids: string[]) => {
        if (!service.bulkDelete) {
          throw new Error("Bulk delete not supported");
        }
        return service.bulkDelete(ids);
      },
      onSuccess: async (data, variables, onMutateResult, context) => {
        queryClient.invalidateQueries({ queryKey: [queryKey, "list"] });
        variables.forEach((id) => {
          queryClient.removeQueries({ queryKey: [queryKey, "detail", id] });
        });
        toast.success(`Deleted ${variables.length} items successfully`);
        await onSuccess?.(data, variables, onMutateResult, context);
      },
      onError: async (error, variables, onMutateResult, context) => {
        toast.error(error.message || "Failed to delete items");
        await onError?.(error, variables, onMutateResult, context);
      },
    });
  }

  return {
    useList,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
    useBulkDelete,
  };
}
