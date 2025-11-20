import { Eye, Pencil, Trash2 } from "lucide-react";
import type { RowAction } from "./DataTableRowActions";

export const createViewAction = (onView: () => void): RowAction => ({
  label: "View",
  icon: <Eye className="mr-2 h-4 w-4" />,
  onClick: onView,
});

export const createEditAction = (onEdit: () => void): RowAction => ({
  label: "Edit",
  icon: <Pencil className="mr-2 h-4 w-4" />,
  onClick: onEdit,
});

export const createDeleteAction = (onDelete: () => void): RowAction => ({
  label: "Delete",
  icon: <Trash2 className="mr-2 h-4 w-4" />,
  onClick: onDelete,
  variant: "destructive",
  separator: true,
});
