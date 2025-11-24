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
  CreateLanguageDto,
  Language,
} from "@/features/languages/types/language.types";
import {
  useCreateLanguage,
  useDeleteLanguage,
  useLanguages,
  useUpdateLanguage,
} from "@/features/languages/api/useLanguages";
import { createLanguageColumns } from "@/features/languages/components/columns";
import { LanguageForm } from "@/features/languages/components/LanguageForm";

export default function LanguagesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [deletingLanguage, setDeletingLanguage] = useState<Language | null>(
    null
  );

  const tableState = useTableState({
    initialLimit: 20,
    searchField: "code",
  });

  const { data, isLoading } = useLanguages(tableState.queryParams);

  const createMutation = useCreateLanguage({
    onSuccess: () => {
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useUpdateLanguage({
    onSuccess: () => {
      setEditingLanguage(null);
    },
  });

  const deleteMutation = useDeleteLanguage({
    onSuccess: () => {
      setDeletingLanguage(null);
    },
  });

  const handleCreate = (data: CreateLanguageDto) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: CreateLanguageDto) => {
    if (editingLanguage) {
      updateMutation.mutate({
        id: editingLanguage.id,
        data: {
          ...data,
          version: editingLanguage.version,
        },
      });
    }
  };

  const handleDelete = () => {
    if (deletingLanguage) {
      deleteMutation.mutate(deletingLanguage.id);
    }
  };

  const columns = createLanguageColumns({
    onEdit: setEditingLanguage,
    onDelete: setDeletingLanguage,
  });

  if (!isLoading && data?.data?.length === 0 && !tableState.search) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Languages</h1>
            <p className="text-muted-foreground">
              Manage language codes and names for the platform
            </p>
          </div>
        </div>
        <EmptyState
          icon={Plus}
          title="No languages yet"
          description="Get started by creating your first language."
          action={{
            label: "Add Language",
            onClick: () => setIsCreateOpen(true),
          }}
        />
        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Language</DialogTitle>
              <DialogDescription>
                Add a new language to the system
              </DialogDescription>
            </DialogHeader>
            <LanguageForm
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
          <h1 className="text-3xl font-bold tracking-tight">Languages</h1>
          <p className="text-muted-foreground">
            Manage language codes and names for the platform
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Language
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
        searchPlaceholder="Search by code..."
        onPageChange={tableState.setPage}
        onLimitChange={tableState.setLimit}
        onSortChange={tableState.setSort}
        emptyMessage="No languages found."
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Language</DialogTitle>
            <DialogDescription>
              Add a new language to the system
            </DialogDescription>
          </DialogHeader>
          <LanguageForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingLanguage}
        onOpenChange={(open) => !open && setEditingLanguage(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Language</DialogTitle>
            <DialogDescription>Update language information</DialogDescription>
          </DialogHeader>
          {editingLanguage && (
            <LanguageForm
              language={editingLanguage}
              onSubmit={handleUpdate}
              onCancel={() => setEditingLanguage(null)}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingLanguage}
        onOpenChange={(open) => !open && setDeletingLanguage(null)}
        onConfirm={handleDelete}
        title="Delete Language"
        description={`Are you sure you want to delete ${deletingLanguage?.name} (${deletingLanguage?.code})? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
