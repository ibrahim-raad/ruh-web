import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps {
  title: string;
  isSorted?: "asc" | "desc" | false;
  onSort?: () => void;
  className?: string;
}

export function DataTableColumnHeader({
  title,
  isSorted,
  onSort,
  className,
}: DataTableColumnHeaderProps) {
  if (!onSort) {
    return <div className={cn("font-medium", className)}>{title}</div>;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-8 -ml-3 data-[state=open]:bg-accent hover:bg-accent/50",
        className
      )}
      onClick={onSort}
    >
      <span>{title}</span>
      {isSorted === "desc" ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : isSorted === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
