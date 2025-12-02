import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/shared/components/data-table/DataTableColumnHeader";
import type { TherapyCase } from "../types/therapy-case.types";
import { Badge } from "@/components/ui/badge";

export function createTherapyCaseColumns(): ColumnDef<TherapyCase>[] {
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
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Type"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge>,
    },
    {
      accessorKey: "total_sessions",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Total Sessions"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
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
  ];
}
