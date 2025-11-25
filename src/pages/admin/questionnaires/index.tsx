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
  CreateQuestionnaireDto,
  Questionnaire,
} from "@/features/questionnaires/types/questionnaire.types";
import {
  useCreateQuestionnaire,
  useDeleteQuestionnaire,
  useQuestionnaires,
  useUpdateQuestionnaire,
} from "@/features/questionnaires/api/useQuestionnaires";
import { createQuestionnaireColumns } from "@/features/questionnaires/components/columns";
import { QuestionnaireForm } from "@/features/questionnaires/components/QuestionnaireForm";

export default function QuestionnairesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingQuestionnaire, setEditingQuestionnaire] =
    useState<Questionnaire | null>(null);
  const [deletingQuestionnaire, setDeletingQuestionnaire] =
    useState<Questionnaire | null>(null);

  const tableState = useTableState({
    initialLimit: 20,
    searchField: "title",
  });

  const { data, isLoading } = useQuestionnaires(tableState.queryParams);

  const createMutation = useCreateQuestionnaire({
    onSuccess: () => {
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useUpdateQuestionnaire({
    onSuccess: () => {
      setEditingQuestionnaire(null);
    },
  });

  const deleteMutation = useDeleteQuestionnaire({
    onSuccess: () => {
      setDeletingQuestionnaire(null);
    },
  });

  const handleCreate = (data: CreateQuestionnaireDto) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: CreateQuestionnaireDto) => {
    if (editingQuestionnaire) {
      updateMutation.mutate({
        id: editingQuestionnaire.id,
        data: {
          ...data,
          version: editingQuestionnaire.version,
        },
      });
    }
  };

  const handleDelete = () => {
    if (deletingQuestionnaire) {
      deleteMutation.mutate(deletingQuestionnaire.id);
    }
  };

  const columns = createQuestionnaireColumns({
    onEdit: setEditingQuestionnaire,
    onDelete: setDeletingQuestionnaire,
  });

  if (!isLoading && data?.data?.length === 0 && !tableState.search) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Questionnaires
            </h1>
            <p className="text-muted-foreground">Manage questionnaires</p>
          </div>
        </div>
        <EmptyState
          icon={Plus}
          title="No questionnaires yet"
          description="Get started by creating your first questionnaire."
          action={{
            label: "Add Questionnaire",
            onClick: () => setIsCreateOpen(true),
          }}
        />
        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Questionnaire</DialogTitle>
              <DialogDescription>
                Add a new questionnaire to the system
              </DialogDescription>
            </DialogHeader>
            <QuestionnaireForm
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
          <h1 className="text-3xl font-bold tracking-tight">Questionnaires</h1>
          <p className="text-muted-foreground">Manage questionnaires</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Questionnaire
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
        searchPlaceholder="Search by title..."
        onPageChange={tableState.setPage}
        onLimitChange={tableState.setLimit}
        onSortChange={tableState.setSort}
        emptyMessage="No questionnaires found."
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Questionnaire</DialogTitle>
            <DialogDescription>
              Add a new questionnaire to the system
            </DialogDescription>
          </DialogHeader>
          <QuestionnaireForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingQuestionnaire}
        onOpenChange={(open) => !open && setEditingQuestionnaire(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Questionnaire</DialogTitle>
            <DialogDescription>
              Update questionnaire information
            </DialogDescription>
          </DialogHeader>
          {editingQuestionnaire && (
            <QuestionnaireForm
              questionnaire={editingQuestionnaire}
              onSubmit={handleUpdate}
              onCancel={() => setEditingQuestionnaire(null)}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingQuestionnaire}
        onOpenChange={(open) => !open && setDeletingQuestionnaire(null)}
        onConfirm={handleDelete}
        title="Delete Questionnaire"
        description={`Are you sure you want to delete ${deletingQuestionnaire?.title}? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
