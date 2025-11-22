import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/shared/components/data-table/DataTableColumnHeader";
import { DataTableRowActions } from "@/shared/components/data-table/DataTableRowActions";
import {
  createEditAction,
  createDeleteAction,
} from "@/shared/components/data-table/row-actions-helpers";
import type { Currency } from "../types/currency.types";

interface CreateColumnsOptions {
  onEdit: (currency: Currency) => void;
  onDelete: (currency: Currency) => void;
}

export function createCurrencyColumns({
  onEdit,
  onDelete,
}: CreateColumnsOptions): ColumnDef<Currency>[] {
  return [
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
        <Badge variant="outline" className="font-mono font-semibold">
          {row.getValue("code")}
        </Badge>
      ),
      size: 120,
      minSize: 100,
    },
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
      size: 300,
      minSize: 200,
    },
    {
      accessorKey: "symbol",
      header: "Symbol",
      cell: ({ row }) => {
        const symbol = row.getValue("symbol") as string | undefined;
        return (
          <div className="text-center text-lg font-semibold">
            {symbol || "-"}
          </div>
        );
      },
      size: 100,
      minSize: 80,
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
      size: 140,
      minSize: 120,
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
      size: 140,
      minSize: 120,
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const currency = row.original;
        return (
          <div className="text-right">
            <DataTableRowActions
              actions={[
                createEditAction(() => onEdit(currency)),
                createDeleteAction(() => onDelete(currency)),
              ]}
            />
          </div>
        );
      },
      size: 80,
      minSize: 60,
    },
  ];
}
