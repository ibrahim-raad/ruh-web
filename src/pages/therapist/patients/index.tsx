import { DataTable } from "@/shared/components/data-table/DataTable";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { useTableState } from "@/shared/hooks/useTableState";
import { useTherapyCases } from "@/features/therapy-cases/api/useTherapyCases";
import { createTherapyCaseColumns } from "@/features/therapy-cases/components/columns";
import {
  useTransferRequests,
  useAcceptTransferRequest,
  useRejectTransferRequest,
} from "@/features/transfer-requests/api/useTransferRequests";
import { createTransferRequestColumns } from "@/features/transfer-requests/components/columns";
import { TherapistTransferRequestStatus } from "@/features/transfer-requests/types/transfer-request.types";
import { Users, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { UserEmailStatus, UserStatus } from "@/features/users/types/user.types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { TherapistTransferRequest } from "@/features/transfer-requests/types/transfer-request.types";
import type { TherapyCase } from "@/features/therapy-cases/types/therapy-case.types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { PatientProfileDrawer } from "@/features/patients/components/PatientProfileDrawer";
import type { Patient } from "@/features/patients/types/patient.types";

export default function TherapistPatientsPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const isVerified =
    user?.email_status === UserEmailStatus.VERIFIED &&
    user?.status === UserStatus.ACTIVE;

  const [rejectionDialog, setRejectionDialog] = useState<{
    isOpen: boolean;
    request: TherapistTransferRequest | null;
  }>({
    isOpen: false,
    request: null,
  });
  const [rejectionReason, setRejectionReason] = useState("");

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  const patientsTableState = useTableState({
    initialLimit: 20,
    searchField: "patient_name",
  });

  const { data: patientsData, isLoading: isLoadingPatients } = useTherapyCases(
    patientsTableState.queryParams
  );

  const handleViewDetails = (therapyCase: TherapyCase) => {
    navigate(ROUTES.THERAPIST.PATIENTS + "/" + therapyCase.id);
  };

  const patientsColumns = createTherapyCaseColumns({
    onViewDetails: handleViewDetails,
  });

  const requestsTableState = useTableState({
    initialLimit: 20,
    searchField: "patient_name",
    initialFilters: {
      status: TherapistTransferRequestStatus.PENDING,
    },
  });

  const { data: requestsData, isLoading: isLoadingRequests } =
    useTransferRequests(requestsTableState.queryParams);

  const { mutate: acceptRequest } = useAcceptTransferRequest();
  const { mutate: rejectRequest } = useRejectTransferRequest();

  const handleAccept = (request: TherapistTransferRequest) => {
    acceptRequest({ id: request.id, version: request.version });
  };

  const handleRejectClick = (request: TherapistTransferRequest) => {
    setRejectionDialog({ isOpen: true, request });
  };

  const handleViewProfile = (request: TherapistTransferRequest) => {
    setSelectedPatient(request.patient);
    setIsProfileDrawerOpen(true);
  };

  const handleConfirmReject = () => {
    if (rejectionDialog.request) {
      rejectRequest({
        id: rejectionDialog.request.id,
        reason: rejectionReason,
        version: rejectionDialog.request.version,
      });
      setRejectionDialog({ isOpen: false, request: null });
      setRejectionReason("");
    }
  };

  const requestsColumns = createTransferRequestColumns({
    onAccept: handleAccept,
    onReject: handleRejectClick,
    onViewProfile: handleViewProfile,
    isVerified,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">View and manage your patients</p>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">My Patients</TabsTrigger>
          <TabsTrigger value="requests">
            Transfer Requests
            {requestsData?.meta.total ? (
              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {requestsData.meta.total}
              </span>
            ) : null}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {!isLoadingPatients &&
          patientsData?.data?.length === 0 &&
          !patientsTableState.search ? (
            <EmptyState
              icon={Users}
              title="No patients yet"
              description="Patients assigned to you will appear here."
            />
          ) : (
            <DataTable
              columns={patientsColumns}
              data={
                patientsData || {
                  data: [],
                  meta: { offset: 0, limit: 20, total: 0, hasNext: false },
                }
              }
              isLoading={isLoadingPatients}
              search={patientsTableState.search}
              onSearchChange={patientsTableState.setSearch}
              searchPlaceholder="Search by patient name..."
              onPageChange={patientsTableState.setPage}
              onLimitChange={patientsTableState.setLimit}
              onSortChange={patientsTableState.setSort}
              emptyMessage="No patients found."
            />
          )}
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          {!isLoadingRequests &&
          requestsData?.data?.length === 0 &&
          !requestsTableState.search ? (
            <EmptyState
              icon={UserPlus}
              title="No transfer requests"
              description="Requests from patients to join your practice will appear here."
            />
          ) : (
            <DataTable
              columns={requestsColumns}
              data={
                requestsData || {
                  data: [],
                  meta: { offset: 0, limit: 20, total: 0, hasNext: false },
                }
              }
              isLoading={isLoadingRequests}
              search={requestsTableState.search}
              onSearchChange={requestsTableState.setSearch}
              searchPlaceholder="Search by patient name..."
              onPageChange={requestsTableState.setPage}
              onLimitChange={requestsTableState.setLimit}
              onSortChange={requestsTableState.setSort}
              emptyMessage="No requests found."
            />
          )}
        </TabsContent>
      </Tabs>

      <Dialog
        open={rejectionDialog.isOpen}
        onOpenChange={(open) =>
          setRejectionDialog((prev) => ({ ...prev, isOpen: open }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Transfer Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request. This will be
              shared with the patient.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setRejectionDialog({ isOpen: false, request: null })
              }
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmReject}
              disabled={!rejectionReason.trim()}
            >
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PatientProfileDrawer
        open={isProfileDrawerOpen}
        onOpenChange={setIsProfileDrawerOpen}
        patient={selectedPatient}
      />
    </div>
  );
}
