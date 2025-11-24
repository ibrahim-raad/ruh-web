#!/usr/bin/env bash

set -euo pipefail

# Usage
#   bash scripts/generate-feature.sh <singular-name> [plural-name] [--scope=admin|therapist]

if [ "${1-}" = "" ]; then
  echo "Usage: $0 <singular-name> [plural-name] [--scope=admin|therapist]"
  exit 1
fi

SINGULAR_RAW="$1"
PLURAL_RAW=""
SCOPE="admin"

# Parse arguments
shift
while [ "$#" -gt 0 ]; do
  case "$1" in
    --scope=*)
      SCOPE="${1#*=}"
      ;;
    *)
      if [ -z "$PLURAL_RAW" ]; then
        PLURAL_RAW="$1"
      fi
      ;;
  esac
  shift
done

to_pascal() {
  local input="$1"
  echo "$input" \
    | sed -E 's/([a-z0-9])([A-Z])/\1 \2/g; s/[_-]/ /g' \
    | awk '{for(i=1;i<=NF;i++){ $i=toupper(substr($i,1,1)) substr($i,2) }}1' \
    | tr -d ' '
}

to_lower() {
  echo "$1" | tr '[:upper:]' '[:lower:]'
}

singular="$(to_lower "$SINGULAR_RAW")"

if [ -n "$PLURAL_RAW" ]; then
  plural="$(to_lower "$PLURAL_RAW")"
else
  # naive pluralization
  if [[ "$singular" =~ [^aeiou]y$ ]]; then
    plural="${singular%y}ies"
  else
    plural="${singular}s"
  fi
fi

SingularPascal="$(to_pascal "$singular")"
PluralPascal="$(to_pascal "$plural")"

# Directories
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
FEATURE_DIR="$REPO_ROOT/src/features/$plural"
PAGE_DIR="$REPO_ROOT/src/pages/$SCOPE/$plural"

if [ -d "$FEATURE_DIR" ]; then
  echo "Error: Feature directory $FEATURE_DIR already exists."
  exit 1
fi

if [ -d "$PAGE_DIR" ]; then
  echo "Error: Page directory $PAGE_DIR already exists."
  exit 1
fi

echo "Creating feature: $SingularPascal ($plural)"
echo "Scope: $SCOPE"

mkdir -p "$FEATURE_DIR/api"
mkdir -p "$FEATURE_DIR/components"
mkdir -p "$FEATURE_DIR/types"
mkdir -p "$PAGE_DIR"

# ---------- Types ----------
cat > "$FEATURE_DIR/types/${singular}.types.ts" <<EOF
import type { BaseEntity } from "@/shared/types/api.types";

export interface ${SingularPascal} extends BaseEntity {
  name: string;
}

export type Create${SingularPascal}Dto = Omit<${SingularPascal}, keyof BaseEntity>;

export type Update${SingularPascal}Dto = Partial<Create${SingularPascal}Dto> & {
  version: number;
};
EOF

# ---------- Service ----------
cat > "$FEATURE_DIR/api/${plural}.service.ts" <<EOF
import { createCrudService } from "@/shared/api/base-crud.service";
import type { ${SingularPascal} } from "../types/${singular}.types";

export const ${plural}Service = createCrudService<${SingularPascal}>("/${plural}");
EOF

# ---------- Hooks ----------
cat > "$FEATURE_DIR/api/use${PluralPascal}.ts" <<EOF
import { createCrudHooks } from "@/shared/hooks/useCrudQuery";
import { ${plural}Service } from "./${plural}.service";
import type { ${SingularPascal} } from "../types/${singular}.types";

const ${singular}Hooks = createCrudHooks<${SingularPascal}>({
  queryKey: "${plural}",
  service: ${plural}Service,
  messages: {
    createSuccess: "${SingularPascal} created successfully",
    updateSuccess: "${SingularPascal} updated successfully",
    deleteSuccess: "${SingularPascal} deleted successfully",
    createError: "Failed to create ${singular}",
    updateError: "Failed to update ${singular}",
    deleteError: "Failed to delete ${singular}",
  },
});

export const use${PluralPascal} = ${singular}Hooks.useList;
export const use${SingularPascal} = ${singular}Hooks.useGetById;
export const useCreate${SingularPascal} = ${singular}Hooks.useCreate;
export const useUpdate${SingularPascal} = ${singular}Hooks.useUpdate;
export const useDelete${SingularPascal} = ${singular}Hooks.useDelete;
export const useBulkDelete${PluralPascal} = ${singular}Hooks.useBulkDelete;
EOF

# ---------- Form ----------
cat > "$FEATURE_DIR/components/${SingularPascal}Form.tsx" <<EOF
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ${SingularPascal}, Create${SingularPascal}Dto } from "../types/${singular}.types";

const ${singular}Schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
});

type ${SingularPascal}FormValues = z.infer<typeof ${singular}Schema>;

interface ${SingularPascal}FormProps {
  ${singular}?: ${SingularPascal};
  onSubmit: (data: Create${SingularPascal}Dto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ${SingularPascal}Form({
  ${singular},
  onSubmit,
  onCancel,
  isLoading,
}: ${SingularPascal}FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<${SingularPascal}FormValues>({
    resolver: zodResolver(${singular}Schema),
    defaultValues: ${singular}
      ? {
          name: ${singular}.name,
        }
      : {
          name: "",
        },
  });

  const handleFormSubmit = (data: ${SingularPascal}FormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Name"
          {...register("name")}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : ${singular} ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
EOF

# ---------- Columns ----------
cat > "$FEATURE_DIR/components/columns.tsx" <<EOF
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/shared/components/data-table/DataTableColumnHeader";
import { DataTableRowActions } from "@/shared/components/data-table/DataTableRowActions";
import {
  createEditAction,
  createDeleteAction,
} from "@/shared/components/data-table/row-actions-helpers";
import type { ${SingularPascal} } from "../types/${singular}.types";

interface CreateColumnsOptions {
  onEdit: (${singular}: ${SingularPascal}) => void;
  onDelete: (${singular}: ${SingularPascal}) => void;
}

export function create${SingularPascal}Columns({
  onEdit,
  onDelete,
}: CreateColumnsOptions): ColumnDef<${SingularPascal}>[] {
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
        const ${singular} = row.original;
        return (
          <div className="text-right">
            <DataTableRowActions
              actions={[
                createEditAction(() => onEdit(${singular})),
                createDeleteAction(() => onDelete(${singular})),
              ]}
            />
          </div>
        );
      },
    },
  ];
}
EOF

# ---------- Page ----------
cat > "$PAGE_DIR/index.tsx" <<EOF
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable } from "@/shared/components/data-table/DataTable";
import { ConfirmDialog } from "@/shared/components/dialogs/ConfirmDialog";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { useTableState } from "@/shared/hooks/useTableState";
import type {
  Create${SingularPascal}Dto,
  ${SingularPascal},
} from "@/features/${plural}/types/${singular}.types";
import {
  useCreate${SingularPascal},
  useDelete${SingularPascal},
  use${PluralPascal},
  useUpdate${SingularPascal},
} from "@/features/${plural}/api/use${PluralPascal}";
import { create${SingularPascal}Columns } from "@/features/${plural}/components/columns";
import { ${SingularPascal}Form } from "@/features/${plural}/components/${SingularPascal}Form";

export default function ${PluralPascal}Page() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editing${SingularPascal}, setEditing${SingularPascal}] = useState<${SingularPascal} | null>(null);
  const [deleting${SingularPascal}, setDeleting${SingularPascal}] = useState<${SingularPascal} | null>(
    null
  );

  const tableState = useTableState({
    initialLimit: 20,
    searchField: "name",
  });

  const { data, isLoading } = use${PluralPascal}(tableState.queryParams);

  const createMutation = useCreate${SingularPascal}({
    onSuccess: () => {
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useUpdate${SingularPascal}({
    onSuccess: () => {
      setEditing${SingularPascal}(null);
    },
  });

  const deleteMutation = useDelete${SingularPascal}({
    onSuccess: () => {
      setDeleting${SingularPascal}(null);
    },
  });

  const handleCreate = (data: Create${SingularPascal}Dto) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: Create${SingularPascal}Dto) => {
    if (editing${SingularPascal}) {
      updateMutation.mutate({
        id: editing${SingularPascal}.id,
        data: {
          ...data,
          version: editing${SingularPascal}.version,
        },
      });
    }
  };

  const handleDelete = () => {
    if (deleting${SingularPascal}) {
      deleteMutation.mutate(deleting${SingularPascal}.id);
    }
  };

  const columns = create${SingularPascal}Columns({
    onEdit: setEditing${SingularPascal},
    onDelete: setDeleting${SingularPascal},
  });

  if (!isLoading && data?.data?.length === 0 && !tableState.search) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">${PluralPascal}</h1>
            <p className="text-muted-foreground">
              Manage ${plural}
            </p>
          </div>
        </div>
        <EmptyState
          icon={Plus}
          title="No ${plural} yet"
          description="Get started by creating your first ${singular}."
          action={{
            label: "Add ${SingularPascal}",
            onClick: () => setIsCreateOpen(true),
          }}
        />
        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create ${SingularPascal}</DialogTitle>
              <DialogDescription>
                Add a new ${singular} to the system
              </DialogDescription>
            </DialogHeader>
            <${SingularPascal}Form
              onSubmit={handleCreate}
              onCancel={() => setIsCreateOpen(false)}
              isLoading={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">${PluralPascal}</h1>
          <p className="text-muted-foreground">
            Manage ${plural}
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add ${SingularPascal}
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={
          data || {
            data: [],
            meta: { offset: 0, limit: 20, total: 0, hasNext: false },
          }
        }
        isLoading={isLoading}
        search={tableState.search}
        onSearchChange={tableState.setSearch}
        searchPlaceholder="Search by name..."
        onPageChange={tableState.setPage}
        onLimitChange={tableState.setLimit}
        onSortChange={tableState.setSort}
        emptyMessage="No ${plural} found."
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create ${SingularPascal}</DialogTitle>
            <DialogDescription>
              Add a new ${singular} to the system
            </DialogDescription>
          </DialogHeader>
          <${SingularPascal}Form
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editing${SingularPascal}}
        onOpenChange={(open) => !open && setEditing${SingularPascal}(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit ${SingularPascal}</DialogTitle>
            <DialogDescription>Update ${singular} information</DialogDescription>
          </DialogHeader>
          {editing${SingularPascal} && (
            <${SingularPascal}Form
              ${singular}={editing${SingularPascal}}
              onSubmit={handleUpdate}
              onCancel={() => setEditing${SingularPascal}(null)}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deleting${SingularPascal}}
        onOpenChange={(open) => !open && setDeleting${SingularPascal}(null)}
        onConfirm={handleDelete}
        title="Delete ${SingularPascal}"
        description={\`Are you sure you want to delete \${deleting${SingularPascal}?.name}? This action cannot be undone.\`}
        confirmText="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
EOF

echo "✔ Generated feature: $PluralPascal ($plural)"
echo "  • Feature Directory: src/features/$plural"
echo "  • Page Directory: src/pages/$SCOPE/$plural"
echo "Next steps:"
echo "  1) Add route to src/app/router/index.tsx"
echo "  2) Add navigation item (if applicable)"
echo "  3) Verify backend endpoint matches '/$plural'"

