import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/shared/components/data-table/DataTableColumnHeader";
import { DataTableRowActions } from "@/shared/components/data-table/DataTableRowActions";
import {
  createEditAction,
  createDeleteAction,
} from "@/shared/components/data-table/row-actions-helpers";
import type { Language } from "../types/language.types";
import { Badge } from "@/components/ui/badge";

interface CreateColumnsOptions {
  onEdit: (language: Language) => void;
  onDelete: (language: Language) => void;
}

export function createLanguageColumns({
  onEdit,
  onDelete,
}: CreateColumnsOptions): ColumnDef<Language>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Name"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Code"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => (
        <Badge variant="outline" className="font-mono font-medium">
          {row.getValue("code")}
        </Badge>
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
      header: () => <DataTableColumnHeader title="Actions" align="right" />,
      cell: ({ row }) => {
        const language = row.original;
        return (
          <div className="text-right">
            <DataTableRowActions
              actions={[
                createEditAction(() => onEdit(language)),
                createDeleteAction(() => onDelete(language)),
              ]}
            />
          </div>
        );
      },
    },
  ];
}
