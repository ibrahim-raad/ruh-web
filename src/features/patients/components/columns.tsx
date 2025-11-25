import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/shared/components/data-table/DataTableColumnHeader";
import type { Patient } from "../types/patient.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface CreateColumnsOptions {
  onViewProfile?: (patient: Patient) => void;
}

export function createPatientColumns(
  options: CreateColumnsOptions = {}
): ColumnDef<Patient>[] {
  const { onViewProfile } = options;

  return [
    {
      id: "user.full_name",
      accessorKey: "user.full_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Name"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.original.user.full_name}</div>
      ),
    },
    {
      id: "user.email",
      accessorKey: "user.email",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Email"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => <div>{row.original.user.email}</div>,
    },
    {
      accessorKey: "preferred_therapist_gender",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Preferred Therapist Gender"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.preferred_therapist_gender.replace("_", " ")}
        </Badge>
      ),
    },
    {
      id: "preferred_therapy_mode",
      accessorKey: "preferred_therapy_mode",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Preferred Therapy Mode"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.preferred_therapy_mode.replace("_", " ")}
        </Badge>
      ),
    },
    {
      id: "created_at",
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Created At"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => {
        const date = row.getValue("created_at") as string;
        return (
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {format(new Date(date), "MMM dd, yyyy")}
          </div>
        );
      },
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Updated At"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => {
        const date = row.getValue("updated_at") as string;
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
        if (!onViewProfile) return null;
        return (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewProfile(row.original)}
            >
              <User className="mr-2 h-4 w-4" />
              View Profile
            </Button>
          </div>
        );
      },
    },
  ];
}
