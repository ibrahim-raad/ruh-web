import { DataTable } from "@/shared/components/data-table/DataTable";
import { useTableState } from "@/shared/hooks/useTableState";
import { useSessions } from "@/features/sessions/api/useSessions";
import { createSessionColumns } from "@/features/sessions/components/columns";

export default function SessionsPage() {
  const tableState = useTableState({
    initialLimit: 20,
    searchField: "name",
  });

  const { data, isLoading } = useSessions(tableState.queryParams);

  const columns = createSessionColumns();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
          <p className="text-muted-foreground">Manage sessions</p>
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
        emptyMessage="No sessions found."
      />
    </div>
  );
}
