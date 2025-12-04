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
  CreateSessionDto,
  Session,
} from "@/features/sessions/types/session.types";
import {
  useCreateSession,
  useDeleteSession,
  useSessions,
  useUpdateSession,
} from "@/features/sessions/api/useSessions";
import { createSessionColumns } from "@/features/sessions/components/columns";
import { SessionForm } from "@/features/sessions/components/SessionForm";

export default function SessionsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [deletingSession, setDeletingSession] = useState<Session | null>(
    null
  );

  const tableState = useTableState({
    initialLimit: 20,
    searchField: "name",
  });

  const { data, isLoading } = useSessions(tableState.queryParams);

  const createMutation = useCreateSession({
    onSuccess: () => {
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useUpdateSession({
    onSuccess: () => {
      setEditingSession(null);
    },
  });

  const deleteMutation = useDeleteSession({
    onSuccess: () => {
      setDeletingSession(null);
    },
  });

  const handleCreate = (data: CreateSessionDto) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: CreateSessionDto) => {
    if (editingSession) {
      updateMutation.mutate({
        id: editingSession.id,
        data: {
          ...data,
          version: editingSession.version,
        },
      });
    }
  };

  const handleDelete = () => {
    if (deletingSession) {
      deleteMutation.mutate(deletingSession.id);
    }
  };

  const columns = createSessionColumns({
    onEdit: setEditingSession,
    onDelete: setDeletingSession,
  });

  if (!isLoading && data?.data?.length === 0 && !tableState.search) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
            <p className="text-muted-foreground">
              Manage sessions
            </p>
          </div>
        </div>
        <EmptyState
          icon={Plus}
          title="No sessions yet"
          description="Get started by creating your first session."
          action={{
            label: "Add Session",
            onClick: () => setIsCreateOpen(true),
          }}
        />
        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Session</DialogTitle>
              <DialogDescription>
                Add a new session to the system
              </DialogDescription>
            </DialogHeader>
            <SessionForm
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
          <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
          <p className="text-muted-foreground">
            Manage sessions
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Session
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
        emptyMessage="No sessions found."
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Session</DialogTitle>
            <DialogDescription>
              Add a new session to the system
            </DialogDescription>
          </DialogHeader>
          <SessionForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingSession}
        onOpenChange={(open) => !open && setEditingSession(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Session</DialogTitle>
            <DialogDescription>Update session information</DialogDescription>
          </DialogHeader>
          {editingSession && (
            <SessionForm
              session={editingSession}
              onSubmit={handleUpdate}
              onCancel={() => setEditingSession(null)}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingSession}
        onOpenChange={(open) => !open && setDeletingSession(null)}
        onConfirm={handleDelete}
        title="Delete Session"
        description={`Are you sure you want to delete ${deletingSession?.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
