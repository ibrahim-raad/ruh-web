import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { currenciesService } from "./currencies.service";
import type { Currency } from "../types/currency.types";

const currencyHooks = createCrudHooks<Currency>({
  queryKey: "currencies",
  service: currenciesService,
  messages: {
    createSuccess: "Currency created successfully",
    updateSuccess: "Currency updated successfully",
    deleteSuccess: "Currency deleted successfully",
    createError: "Failed to create currency",
    updateError: "Failed to update currency",
    deleteError: "Failed to delete currency",
  },
});

export const useCurrencies = currencyHooks.useList;
export const useCurrency = currencyHooks.useGetById;
export const useCreateCurrency = currencyHooks.useCreate;
export const useUpdateCurrency = currencyHooks.useUpdate;
export const useDeleteCurrency = currencyHooks.useDelete;
export const useBulkDeleteCurrencies = currencyHooks.useBulkDelete;
