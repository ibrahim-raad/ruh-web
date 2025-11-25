import { useState } from "react";
import { UserRound } from "lucide-react";

import { DataTable } from "@/shared/components/data-table/DataTable";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { useTableState } from "@/shared/hooks/useTableState";
import { usePatients } from "@/features/patients/api/usePatients";
import { createPatientColumns } from "@/features/patients/components/columns";
import { PatientProfileDrawer } from "@/features/patients/components/PatientProfileDrawer";
import type { Patient } from "@/features/patients/types/patient.types";

export default function PatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const tableState = useTableState({
    initialLimit: 20,
    searchField: "name",
  });

  const { data, isLoading } = usePatients(tableState.queryParams);

  const columns = createPatientColumns({
    onViewProfile: setSelectedPatient,
  });

  if (!isLoading && data?.data?.length === 0 && !tableState.search) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
            <p className="text-muted-foreground">Manage patients</p>
          </div>
        </div>
        <EmptyState
          icon={UserRound}
          title="No patients yet"
          description="Patients can register on the mobile app."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">Manage patients</p>
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
        emptyMessage="No patients found."
      />

      <PatientProfileDrawer
        open={!!selectedPatient}
        onOpenChange={(open) => !open && setSelectedPatient(null)}
        patient={selectedPatient}
      />
    </div>
  );
}
