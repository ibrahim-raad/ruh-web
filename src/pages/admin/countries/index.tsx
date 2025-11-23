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
  useCountries,
  useCreateCountry,
  useDeleteCountry,
  useUpdateCountry,
} from "@/features/countries/api/useCountries";
import type {
  Country,
  CreateCountryDto,
} from "@/features/countries/types/country.types";
import { createCountryColumns } from "@/features/countries/components/columns";
import { CountryForm } from "@/features/countries/components/CountryForm";

export default function CountriesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [deletingCountry, setDeletingCountry] = useState<Country | null>(null);

  const tableState = useTableState({
    initialLimit: 20,
    searchField: "name",
  });

  const { data, isLoading } = useCountries(tableState.queryParams);

  const createMutation = useCreateCountry({
    onSuccess: () => {
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useUpdateCountry({
    onSuccess: () => {
      setEditingCountry(null);
    },
  });

  const deleteMutation = useDeleteCountry({
    onSuccess: () => {
      setDeletingCountry(null);
    },
  });

  const handleCreate = (data: CreateCountryDto) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: CreateCountryDto) => {
    if (editingCountry) {
      updateMutation.mutate({
        id: editingCountry.id,
        data: {
          ...data,
          version: editingCountry.version,
        },
      });
    }
  };

  const handleDelete = () => {
    if (deletingCountry) {
      deleteMutation.mutate(deletingCountry.id);
    }
  };

  const columns = createCountryColumns({
    onEdit: setEditingCountry,
    onDelete: setDeletingCountry,
  });

  if (!isLoading && data?.data?.length === 0 && !tableState.search) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Countries</h1>
            <p className="text-muted-foreground">
              Manage countries for the platform
            </p>
          </div>
        </div>
        <EmptyState
          icon={Plus}
          title="No countries yet"
          description="Get started by creating your first country."
          action={{
            label: "Add Country",
            onClick: () => setIsCreateOpen(true),
          }}
        />
        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Country</DialogTitle>
              <DialogDescription>
                Add a new country to the system
              </DialogDescription>
            </DialogHeader>
            <CountryForm
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
          <h1 className="text-3xl font-bold tracking-tight">Countries</h1>
          <p className="text-muted-foreground">
            Manage countries for the platform
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Country
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
        emptyMessage="No countries found."
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Country</DialogTitle>
            <DialogDescription>
              Add a new country to the system
            </DialogDescription>
          </DialogHeader>
          <CountryForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingCountry}
        onOpenChange={(open) => !open && setEditingCountry(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Country</DialogTitle>
            <DialogDescription>Update country information</DialogDescription>
          </DialogHeader>
          {editingCountry && (
            <CountryForm
              country={editingCountry}
              onSubmit={handleUpdate}
              onCancel={() => setEditingCountry(null)}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deletingCountry}
        onOpenChange={(open) => !open && setDeletingCountry(null)}
        onConfirm={handleDelete}
        title="Delete Country"
        description={`Are you sure you want to delete ${deletingCountry?.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
