import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable } from "@/shared/components/data-table/DataTable";
import { ConfirmDialog } from "@/shared/components/dialogs/ConfirmDialog";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { useTableState } from "@/shared/hooks/useTableState";
import type {
  CreateTherapistCertificateDto,
  TherapistCertificate,
} from "@/features/therapists-certificates/types/therapist-certificate.types";
import {
  useCreateTherapistCertificate,
  useDeleteTherapistCertificate,
  useTherapistsCertificates,
  useUpdateTherapistCertificate,
} from "@/features/therapists-certificates/api/useTherapistsCertificates";
import { createTherapistCertificateColumns } from "@/features/therapists-certificates/components/columns";
import { TherapistCertificateForm } from "@/features/therapists-certificates/components/TherapistCertificateForm";

export default function TherapistsCertificatesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTherapistCertificate, setEditingTherapistCertificate] =
    useState<TherapistCertificate | null>(null);
  const [deletingTherapistCertificate, setDeletingTherapistCertificate] =
    useState<TherapistCertificate | null>(null);

  const tableState = useTableState({
    initialLimit: 20,
    searchField: "name",
  });

  const { data, isLoading } = useTherapistsCertificates(tableState.queryParams);

  const createMutation = useCreateTherapistCertificate({
    onSuccess: () => {
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useUpdateTherapistCertificate({
    onSuccess: () => {
      setEditingTherapistCertificate(null);
    },
  });

  const deleteMutation = useDeleteTherapistCertificate({
    onSuccess: () => {
      setDeletingTherapistCertificate(null);
    },
  });

  const handleCreate = (data: CreateTherapistCertificateDto) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: CreateTherapistCertificateDto) => {
    if (editingTherapistCertificate) {
      updateMutation.mutate({
        id: editingTherapistCertificate.id,
        data: {
          ...data,
          version: editingTherapistCertificate.version,
        },
      });
    }
  };

  const handleDelete = () => {
    if (deletingTherapistCertificate) {
      deleteMutation.mutate(deletingTherapistCertificate.id);
    }
  };

  const columns = createTherapistCertificateColumns({
    onEdit: setEditingTherapistCertificate,
    onDelete: setDeletingTherapistCertificate,
  });

  if (!isLoading && data?.data?.length === 0 && !tableState.search) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              TherapistsCertificates
            </h1>
            <p className="text-muted-foreground">
              Manage therapists-certificates
            </p>
          </div>
        </div>
        <EmptyState
          icon={Plus}
          title="No therapists-certificates yet"
          description="Get started by creating your first therapist certificate."
          action={{
            label: "Add TherapistCertificate",
            onClick: () => setIsCreateOpen(true),
          }}
        />
        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create TherapistCertificate</DialogTitle>
              <DialogDescription>
                Add a new therapist certificate to the system
              </DialogDescription>
            </DialogHeader>
            <TherapistCertificateForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateOpen(false)}
              isLoading={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            TherapistsCertificates
          </h1>
          <p className="text-muted-foreground">
            Manage therapists-certificates
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add TherapistCertificate
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={
          data || {
            data: [],
            meta: { offset: 0, limit: 20, total: 0, hasNext: false },
          }
        }
        isLoading={isLoading}
        search={tableState.search}
        onSearchChange={tableState.setSearch}
        searchPlaceholder="Search by name..."
        onPageChange={tableState.setPage}
        onLimitChange={tableState.setLimit}
        onSortChange={tableState.setSort}
        emptyMessage="No therapists-certificates found."
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create TherapistCertificate</DialogTitle>
            <DialogDescription>
              Add a new therapist certificate to the system
            </DialogDescription>
          </DialogHeader>
          <TherapistCertificateForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingTherapistCertificate}
        onOpenChange={(open) => !open && setEditingTherapistCertificate(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit TherapistCertificate</DialogTitle>
            <DialogDescription>
              Update therapist certificate information
            </DialogDescription>
          </DialogHeader>
          {editingTherapistCertificate && (
            <TherapistCertificateForm
              therapistCertificate={editingTherapistCertificate}
              onSubmit={handleUpdate}
              onCancel={() => setEditingTherapistCertificate(null)}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingTherapistCertificate}
        onOpenChange={(open) => !open && setDeletingTherapistCertificate(null)}
        onConfirm={handleDelete}
        title="Delete TherapistCertificate"
        description={`Are you sure you want to delete ${deletingTherapistCertificate?.title}? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
