import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { transferRequestsService } from "./transfer-requests.service";
import type { TherapistTransferRequest } from "../types/transfer-request.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const transferRequestHooks = createCrudHooks<TherapistTransferRequest>({
  queryKey: "transfer-requests",
  service: transferRequestsService,
});

export const useTransferRequests = transferRequestHooks.useList;
export const useTransferRequest = transferRequestHooks.useGetById;

export const useAcceptTransferRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, version }: { id: string; version: number }) =>
      transferRequestsService.accept(id, version),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transfer-requests"] });
      queryClient.invalidateQueries({ queryKey: ["therapy-cases"] });
      toast.success("Request accepted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to accept request");
    },
  });
};

export const useRejectTransferRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      reason,
      version,
    }: {
      id: string;
      reason: string;
      version: number;
    }) => transferRequestsService.reject(id, reason, version),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transfer-requests"] });
      toast.success("Request rejected successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reject request");
    },
  });
};
