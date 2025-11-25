import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, ArrowLeft, User } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/shared/components/data-table/DataTable";
import { useTableState } from "@/shared/hooks/useTableState";
import { ROUTES } from "@/shared/config/routes";
import { usePatients } from "@/features/patients/api/usePatients";
import { createPatientColumns } from "@/features/patients/components/columns";
import { PatientProfileDrawer } from "@/features/patients/components/PatientProfileDrawer";
import type { Patient } from "@/features/patients/types/patient.types";

export default function QuestionnaireResponsesPage() {
  const { id: questionnaireId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const tableState = useTableState({
    searchField: "name",
  });

  const { data: patients, isLoading } = usePatients(tableState.queryParams);

  const baseColumns = createPatientColumns();
  const columns: ColumnDef<Patient>[] = [
    ...baseColumns,
    {
      id: "response-actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedPatient(row.original)}
            >
              <User className="mr-2 h-4 w-4" />
              View Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (!questionnaireId) return;
                const path = ROUTES.ADMIN.QUESTIONNAIRE_RESPONSE_DETAIL.replace(
                  ":questionnaireId",
                  questionnaireId
                ).replace(":patientId", row.original.user.id);
                navigate(path);
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Response
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(ROUTES.ADMIN.QUESTIONNAIRES)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Questionnaire Responses
          </h1>
          <p className="text-muted-foreground">
            Select a patient to view their responses.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={
          patients || {
            data: [],
            meta: { total: 0, offset: 0, limit: 10, hasNext: false },
          }
        }
        isLoading={isLoading}
        search={tableState.search}
        onSearchChange={tableState.setSearch}
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
