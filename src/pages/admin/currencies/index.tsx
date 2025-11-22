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
import {
  useCurrencies,
  useCreateCurrency,
  useUpdateCurrency,
  useDeleteCurrency,
} from "@/features/currencies/api/useCurrencies";
import { createCurrencyColumns } from "@/features/currencies/components/columns";
import { CurrencyForm } from "@/features/currencies/components/CurrencyForm";
import type {
  Currency,
  CreateCurrencyDto,
} from "@/features/currencies/types/currency.types";

export default function CurrenciesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null);
  const [deletingCurrency, setDeletingCurrency] = useState<Currency | null>(
    null
  );

  const tableState = useTableState({
    initialLimit: 20,
    searchField: "code",
  });

  const { data, isLoading } = useCurrencies(tableState.queryParams);

  const createMutation = useCreateCurrency({
    onSuccess: () => {
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useUpdateCurrency({
    onSuccess: () => {
      setEditingCurrency(null);
    },
  });

  const deleteMutation = useDeleteCurrency({
    onSuccess: () => {
      setDeletingCurrency(null);
    },
  });

  const handleCreate = (data: CreateCurrencyDto) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: CreateCurrencyDto) => {
    if (editingCurrency) {
      updateMutation.mutate({
        id: editingCurrency.id,
        data: {
          ...data,
          version: editingCurrency.version,
        },
      });
    }
  };

  const handleDelete = () => {
    if (deletingCurrency) {
      deleteMutation.mutate(deletingCurrency.id);
    }
  };

  const columns = createCurrencyColumns({
    onEdit: setEditingCurrency,
    onDelete: setDeletingCurrency,
  });

  if (!isLoading && data?.data?.length === 0 && !tableState.search) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Currencies</h1>
            <p className="text-muted-foreground">
              Manage currency codes and symbols for the platform
            </p>
          </div>
        </div>
        <EmptyState
          icon={Plus}
          title="No currencies yet"
          description="Get started by creating your first currency."
          action={{
            label: "Add Currency",
            onClick: () => setIsCreateOpen(true),
          }}
        />
        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Currency</DialogTitle>
              <DialogDescription>
                Add a new currency to the system
              </DialogDescription>
            </DialogHeader>
            <CurrencyForm
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
          <h1 className="text-3xl font-bold tracking-tight">Currencies</h1>
          <p className="text-muted-foreground">
            Manage currency codes and symbols for the platform
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Currency
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
        emptyMessage="No currencies found."
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Currency</DialogTitle>
            <DialogDescription>
              Add a new currency to the system
            </DialogDescription>
          </DialogHeader>
          <CurrencyForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingCurrency}
        onOpenChange={(open) => !open && setEditingCurrency(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Currency</DialogTitle>
            <DialogDescription>Update currency information</DialogDescription>
          </DialogHeader>
          {editingCurrency && (
            <CurrencyForm
              currency={editingCurrency}
              onSubmit={handleUpdate}
              onCancel={() => setEditingCurrency(null)}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingCurrency}
        onOpenChange={(open) => !open && setDeletingCurrency(null)}
        onConfirm={handleDelete}
        title="Delete Currency"
        description={`Are you sure you want to delete ${deletingCurrency?.name} (${deletingCurrency?.code})? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
