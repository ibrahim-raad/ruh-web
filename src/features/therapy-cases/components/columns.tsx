import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/shared/components/data-table/DataTableColumnHeader";
import type { TherapyCase } from "../types/therapy-case.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { UserGender } from "@/features/users/types/user.types";

interface CreateColumnsOptions {
  onViewDetails?: (therapyCase: TherapyCase) => void;
}

export function createTherapyCaseColumns(
  options: CreateColumnsOptions = {}
): ColumnDef<TherapyCase>[] {
  const { onViewDetails } = options;

  return [
    {
      accessorKey: "patient.user.full_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Patient Name"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.patient?.user?.full_name}
        </div>
      ),
    },
    {
      accessorKey: "gender",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Gender"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => {
        const gender = row.original.patient.user.gender;
        return (
          <Badge variant={gender === UserGender.MALE ? "default" : "secondary"}>
            {gender}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Status"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={status === "ACTIVE" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "total_sessions",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Total Sessions"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
          align="center"
        />
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.total_sessions}</div>
      ),
    },
    {
      accessorKey: "last_session_at",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Last Session"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => {
        const date = row.getValue("last_session_at") as string;
        if (!date)
          return <div className="text-muted-foreground text-sm">-</div>;
        return (
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {format(new Date(date), "MMM dd, yyyy")}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        if (!onViewDetails) return null;

        return (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewDetails(row.original)}
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
