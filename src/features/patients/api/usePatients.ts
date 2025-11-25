import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { patientsService } from "./patients.service";
import type { Patient } from "../types/patient.types";

const patientHooks = createCrudHooks<Patient>({
  queryKey: "patients",
  service: patientsService,
  messages: {
    createSuccess: "Patient created successfully",
    updateSuccess: "Patient updated successfully",
    deleteSuccess: "Patient deleted successfully",
    createError: "Failed to create patient",
    updateError: "Failed to update patient",
    deleteError: "Failed to delete patient",
  },
});

export const usePatients = patientHooks.useList;
export const usePatient = patientHooks.useGetById;
export const useCreatePatient = patientHooks.useCreate;
export const useUpdatePatient = patientHooks.useUpdate;
export const useDeletePatient = patientHooks.useDelete;
export const useBulkDeletePatients = patientHooks.useBulkDelete;
