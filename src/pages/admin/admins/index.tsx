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
  CreateAdminDto,
  Admin,
} from "@/features/admins/types/admin.types";
import {
  useCreateAdmin,
  useDeleteAdmin,
  useAdmins,
  useUpdateAdmin,
} from "@/features/admins/api/useAdmins";
import { createAdminColumns } from "@/features/admins/components/columns";
import { AdminForm } from "@/features/admins/components/AdminForm";

export default function AdminsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [deletingAdmin, setDeletingAdmin] = useState<Admin | null>(null);

  const tableState = useTableState({
    initialLimit: 20,
    searchField: "name",
  });

  const { data, isLoading } = useAdmins(tableState.queryParams);

  const createMutation = useCreateAdmin({
    onSuccess: () => {
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useUpdateAdmin({
    onSuccess: () => {
      setEditingAdmin(null);
    },
  });

  const deleteMutation = useDeleteAdmin({
    onSuccess: () => {
      setDeletingAdmin(null);
    },
  });

  const handleCreate = (data: CreateAdminDto) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: CreateAdminDto) => {
    if (editingAdmin) {
      updateMutation.mutate({
        id: editingAdmin.id,
        data: {
          ...data,
          version: editingAdmin.user?.version,
          admin_version: editingAdmin.version,
        },
      });
    }
  };

  const handleDelete = () => {
    if (deletingAdmin) {
      deleteMutation.mutate(deletingAdmin.id);
    }
  };

  const columns = createAdminColumns({
    onEdit: setEditingAdmin,
    onDelete: setDeletingAdmin,
  });

  if (!isLoading && data?.data?.length === 0 && !tableState.search) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admins</h1>
            <p className="text-muted-foreground">Manage admins</p>
          </div>
        </div>
        <EmptyState
          icon={Plus}
          title="No admins yet"
          description="Get started by creating your first admin."
          action={{
            label: "Add Admin",
            onClick: () => setIsCreateOpen(true),
          }}
        />
        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Admin</DialogTitle>
              <DialogDescription>
                Add a new admin to the system
              </DialogDescription>
            </DialogHeader>
            <AdminForm
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
          <h1 className="text-3xl font-bold tracking-tight">Admins</h1>
          <p className="text-muted-foreground">Manage admins</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Admin
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
        emptyMessage="No admins found."
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Admin</DialogTitle>
            <DialogDescription>Add a new admin to the system</DialogDescription>
          </DialogHeader>
          <AdminForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingAdmin}
        onOpenChange={(open) => !open && setEditingAdmin(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin</DialogTitle>
            <DialogDescription>Update admin information</DialogDescription>
          </DialogHeader>
          {editingAdmin && (
            <AdminForm
              admin={editingAdmin}
              onSubmit={handleUpdate}
              onCancel={() => setEditingAdmin(null)}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeletingAdmin(null)}
        onConfirm={handleDelete}
        title="Delete Admin"
        description={`Are you sure you want to delete ${deletingAdmin?.user.full_name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
