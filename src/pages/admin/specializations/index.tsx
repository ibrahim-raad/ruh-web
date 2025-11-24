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
  CreateSpecializationDto,
  Specialization,
} from "@/features/specializations/types/specialization.types";
import {
  useCreateSpecialization,
  useDeleteSpecialization,
  useSpecializations,
  useUpdateSpecialization,
} from "@/features/specializations/api/useSpecializations";
import { createSpecializationColumns } from "@/features/specializations/components/columns";
import { SpecializationForm } from "@/features/specializations/components/SpecializationForm";

export default function SpecializationsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingSpecialization, setEditingSpecialization] =
    useState<Specialization | null>(null);
  const [deletingSpecialization, setDeletingSpecialization] =
    useState<Specialization | null>(null);

  const tableState = useTableState({
    initialLimit: 20,
    searchField: "name",
  });

  const { data, isLoading } = useSpecializations(tableState.queryParams);

  const createMutation = useCreateSpecialization({
    onSuccess: () => {
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useUpdateSpecialization({
    onSuccess: () => {
      setEditingSpecialization(null);
    },
  });

  const deleteMutation = useDeleteSpecialization({
    onSuccess: () => {
      setDeletingSpecialization(null);
    },
  });

  const handleCreate = (data: CreateSpecializationDto) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: CreateSpecializationDto) => {
    if (editingSpecialization) {
      updateMutation.mutate({
        id: editingSpecialization.id,
        data: {
          ...data,
          version: editingSpecialization.version,
        },
      });
    }
  };

  const handleDelete = () => {
    if (deletingSpecialization) {
      deleteMutation.mutate(deletingSpecialization.id);
    }
  };

  const columns = createSpecializationColumns({
    onEdit: setEditingSpecialization,
    onDelete: setDeletingSpecialization,
  });

  if (!isLoading && data?.data?.length === 0 && !tableState.search) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Specializations
            </h1>
            <p className="text-muted-foreground">Manage specializations</p>
          </div>
        </div>
        <EmptyState
          icon={Plus}
          title="No specializations yet"
          description="Get started by creating your first specialization."
          action={{
            label: "Add Specialization",
            onClick: () => setIsCreateOpen(true),
          }}
        />
        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Specialization</DialogTitle>
              <DialogDescription>
                Add a new specialization to the system
              </DialogDescription>
            </DialogHeader>
            <SpecializationForm
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
          <h1 className="text-3xl font-bold tracking-tight">Specializations</h1>
          <p className="text-muted-foreground">Manage specializations</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Specialization
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
        emptyMessage="No specializations found."
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Specialization</DialogTitle>
            <DialogDescription>
              Add a new specialization to the system
            </DialogDescription>
          </DialogHeader>
          <SpecializationForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingSpecialization}
        onOpenChange={(open) => !open && setEditingSpecialization(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Specialization</DialogTitle>
            <DialogDescription>
              Update specialization information
            </DialogDescription>
          </DialogHeader>
          {editingSpecialization && (
            <SpecializationForm
              specialization={editingSpecialization}
              onSubmit={handleUpdate}
              onCancel={() => setEditingSpecialization(null)}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingSpecialization}
        onOpenChange={(open) => !open && setDeletingSpecialization(null)}
        onConfirm={handleDelete}
        title="Delete Specialization"
        description={`Are you sure you want to delete ${deletingSpecialization?.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
