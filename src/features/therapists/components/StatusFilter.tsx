import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, X } from "lucide-react";
import { UserStatus } from "@/features/users/types/user.types";

interface StatusFilterProps {
  selectedStatuses: string[];
  onStatusesChange: (statuses: string[]) => void;
}

const statusConfig = {
  [UserStatus.ACTIVE]: {
    label: "Active",
    variant: "default" as const,
  },
  [UserStatus.PENDING]: {
    label: "Pending",
    variant: "secondary" as const,
  },
  [UserStatus.BLOCKED]: {
    label: "Blocked",
    variant: "destructive" as const,
  },
};

export function StatusFilter({
  selectedStatuses,
  onStatusesChange,
}: StatusFilterProps) {
  const [open, setOpen] = useState(false);

  const handleStatusToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      onStatusesChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusesChange([...selectedStatuses, status]);
    }
  };

  const clearAll = () => {
    onStatusesChange([]);
  };

  const availableStatuses = Object.values(UserStatus);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 border-dashed">
          <Filter className="mr-2 h-4 w-4" />
          Status
          {selectedStatuses.length > 0 && (
            <>
              <div className="ml-2 h-4 w-px bg-border" />
              <Badge
                variant="secondary"
                className="ml-2 h-5 px-1.5 text-xs font-normal"
              >
                {selectedStatuses.length}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" align="start">
        <div className="p-3 border-b">
          <h4 className="font-medium text-sm">Filter by Status</h4>
        </div>
        <div className="p-2">
          <div className="space-y-1">
            {availableStatuses.map((status) => (
              <label
                key={status}
                className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 rounded-sm p-2"
              >
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={() => handleStatusToggle(status)}
                  className="h-4 w-4 rounded border-border"
                />
                <Badge
                  variant={statusConfig[status].variant}
                  className="text-xs"
                >
                  {statusConfig[status].label}
                </Badge>
              </label>
            ))}
          </div>
          {selectedStatuses.length > 0 && (
            <div className="pt-2 mt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="w-full justify-start text-xs h-7"
              >
                <X className="mr-1 h-3 w-3" />
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
