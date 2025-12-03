import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/shared/components/data-table/DataTableColumnHeader";
import type { Therapist } from "../types/therapist.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, AlertCircle } from "lucide-react";
import { UserStatus } from "@/features/users/types/user.types";

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
      accessorKey: "user.status",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Status"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => {
        const status = row.original.user.status;
        const isPending = status === UserStatus.PENDING;

        return (
          <div className="flex items-center gap-2">
            <Badge
              variant={
                status === UserStatus.ACTIVE
                  ? "default"
                  : status === UserStatus.BLOCKED
                    ? "destructive"
                    : "secondary"
              }
              className="text-xs"
            >
              {status}
            </Badge>
            {isPending && (
              <div
                className="flex items-center text-amber-600"
                title="Action Required"
              >
                <AlertCircle className="h-4 w-4" />
              </div>
            )}
          </div>
        );
      },
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
