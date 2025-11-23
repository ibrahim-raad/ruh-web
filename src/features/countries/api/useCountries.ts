import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { countriesService } from "./countries.service";
import type { Country } from "../types/country.types";

const countryHooks = createCrudHooks<Country>({
  queryKey: "countries",
  service: countriesService,
  messages: {
    createSuccess: "Country created successfully",
    updateSuccess: "Country updated successfully",
    deleteSuccess: "Country deleted successfully",
    createError: "Failed to create country",
    updateError: "Failed to update country",
    deleteError: "Failed to delete country",
  },
});

export const useCountries = countryHooks.useList;
export const useCountry = countryHooks.useGetById;
export const useCreateCountry = countryHooks.useCreate;
export const useUpdateCountry = countryHooks.useUpdate;
export const useDeleteCountry = countryHooks.useDelete;
export const useBulkDeleteCountries = countryHooks.useBulkDelete;
