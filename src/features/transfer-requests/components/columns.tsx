import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/shared/components/data-table/DataTableColumnHeader";
import type { TherapistTransferRequest } from "../types/transfer-request.types";
import { TherapistTransferRequestStatus } from "../types/transfer-request.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";

interface CreateColumnsOptions {
  onAccept?: (request: TherapistTransferRequest) => void;
  onReject?: (request: TherapistTransferRequest) => void;
  onViewProfile?: (request: TherapistTransferRequest) => void;
  isVerified?: boolean;
}

export function createTransferRequestColumns(
  options: CreateColumnsOptions = {}
): ColumnDef<TherapistTransferRequest>[] {
  const { onAccept, onReject, onViewProfile, isVerified } = options;

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
      accessorKey: "transfer_reason",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Reason"
          isSorted={column.getIsSorted()}
          onSort={() => column.toggleSorting()}
        />
      ),
      cell: ({ row }) => (
        <div
          className="max-w-[300px] truncate"
          title={row.original.transfer_reason}
        >
          {row.original.transfer_reason}
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
        let variant: "default" | "secondary" | "destructive" | "outline" =
          "outline";

        switch (status) {
          case TherapistTransferRequestStatus.PENDING:
            variant = "secondary";
            break;
          case TherapistTransferRequestStatus.APPROVED:
            variant = "default";
            break;
          case TherapistTransferRequestStatus.REJECTED:
            variant = "destructive";
            break;
          case TherapistTransferRequestStatus.CANCELLED:
            variant = "destructive";
            break;
        }

        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader
          title="Requested On"
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
      id: "actions",
      cell: ({ row }) => {
        const isPending =
          row.original.status === TherapistTransferRequestStatus.PENDING;

        return (
          <div className="flex justify-end gap-2 items-center group-hover:opacity-100 transition-opacity">
            {onViewProfile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onViewProfile(row.original)}
                title="View Profile"
                className="hover:bg-accent"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            {isPending && (
              <>
                {onAccept && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => onAccept(row.original)}
                    disabled={!isVerified}
                    title={
                      !isVerified
                        ? "Complete verification to accept requests"
                        : "Accept Request"
                    }
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                {onReject && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onReject(row.original)}
                    disabled={!isVerified}
                    title={
                      !isVerified
                        ? "Complete verification to reject requests"
                        : "Reject Request"
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        );
      },
    },
  ];
}
