import { DataTable } from "@/shared/components/data-table/DataTable";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { useTableState } from "@/shared/hooks/useTableState";
import { useTherapists } from "@/features/therapists/api/useTherapists";
import { createTherapistColumns } from "@/features/therapists/components/columns";
import { HeartPlus } from "lucide-react";

export default function TherapistsPage() {
  const tableState = useTableState({
    initialLimit: 20,
    searchField: "name",
  });

  const { data, isLoading } = useTherapists(tableState.queryParams);

  const columns = createTherapistColumns();

  if (!isLoading && data?.data?.length === 0 && !tableState.search) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Therapists</h1>
            <p className="text-muted-foreground">Manage therapists</p>
          </div>
        </div>
        <EmptyState
          icon={HeartPlus}
          title="No therapists yet"
          description="Therapists are users who have been verified by the admin and can provide therapy services to patients."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Therapists</h1>
          <p className="text-muted-foreground">Manage therapists</p>
        </div>
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
        emptyMessage="No therapists found."
      />
    </div>
  );
}
