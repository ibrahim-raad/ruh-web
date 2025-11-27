import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/shared/components/data-table/DataTableColumnHeader";
import { DataTableRowActions } from "@/shared/components/data-table/DataTableRowActions";
import {
  createEditAction,
  createDeleteAction,
} from "@/shared/components/data-table/row-actions-helpers";
import type { Admin } from "../types/admin.types";
import { Badge } from "@/components/ui/badge";
import { UserGender } from "@/features/users/types/user.types";

interface CreateColumnsOptions {
  onEdit: (admin: Admin) => void;
  onDelete: (admin: Admin) => void;
}

const getGenderBadgeColor = (gender: UserGender) => {
  switch (gender) {
    case UserGender.MALE:
      return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200";
    case UserGender.FEMALE:
      return "bg-pink-100 text-pink-800 hover:bg-pink-200 border-pink-200";
    case UserGender.UNKNOWN:
      return "text-muted-foreground border-muted";
    default:
      return "";
  }
};

export function createAdminColumns({
  onEdit,
  onDelete,
}: CreateColumnsOptions): ColumnDef<Admin>[] {
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
      accessorKey: "admin_role",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Role"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.admin_role.replace("_", " ")}
        </Badge>
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
        const gender = row.original.user.gender;
        return (
          <Badge variant="outline" className={getGenderBadgeColor(gender)}>
            {gender}
          </Badge>
        );
      },
    },
    {
      id: "user.country.name",
      accessorKey: "user.country.name",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Country"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => <div>{row.original.user.country?.name || "-"}</div>,
    },
    {
      accessorKey: "date_of_birth",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Date of Birth"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => {
        const dateVal = row.original.user.date_of_birth;
        let value = "-";
        if (dateVal) {
          const date = new Date(dateVal);
          value = format(date, "MMM dd, yyyy");
        }
        return (
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {value}
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
      header: () => <DataTableColumnHeader title="Actions" align="right" />,
      cell: ({ row }) => {
        const admin = row.original;
        return (
          <div className="text-right">
            <DataTableRowActions
              actions={[
                createEditAction(() => onEdit(admin)),
                createDeleteAction(() => onDelete(admin)),
              ]}
            />
          </div>
        );
      },
    },
  ];
}
