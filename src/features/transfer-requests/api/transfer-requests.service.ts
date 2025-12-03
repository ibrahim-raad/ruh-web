import { createCrudService } from "@/shared/api/base-crud.service";
import { api } from "@/shared/api/client";
import {
  TherapistTransferRequestStatus,
  type TherapistTransferRequest,
} from "../types/transfer-request.types";

const baseService = createCrudService<TherapistTransferRequest>(
  "/therapists-transfer-requests"
);

export const transferRequestsService = {
  ...baseService,
  accept: async (id: string, version: number) => {
    const response = await api.patch<TherapistTransferRequest>(
      `/api/v1/therapists-transfer-requests/${id}`,
      { version, status: TherapistTransferRequestStatus.APPROVED }
    );
    return response.data;
  },
  reject: async (id: string, reason: string, version: number) => {
    const response = await api.patch<TherapistTransferRequest>(
      `/api/v1/therapists-transfer-requests/${id}`,
      {
        status_reason: reason,
        version,
        status: TherapistTransferRequestStatus.REJECTED,
      }
    );
    return response.data;
  },
};
