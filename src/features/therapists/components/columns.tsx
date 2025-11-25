import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/shared/components/data-table/DataTableColumnHeader";
import type { Therapist } from "../types/therapist.types";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface CreateColumnsOptions {
  onViewProfile?: (therapist: Therapist) => void;
}

export function createTherapistColumns(
  options: CreateColumnsOptions = {}
): ColumnDef<Therapist>[] {
  const { onViewProfile } = options;

  return [
    {
      accessorKey: "user.full_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Full Name"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.original.user.full_name}</div>
      ),
    },
    {
      accessorKey: "user.email",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Email"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.original.user.email}</div>
      ),
    },
    {
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
