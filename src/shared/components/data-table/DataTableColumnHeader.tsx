import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps {
  title: string;
  isSorted?: "asc" | "desc" | false;
  onSort?: () => void;
  className?: string;
  align?: "left" | "center" | "right";
}

const alignmentClasses = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const wrapperAlignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function DataTableColumnHeader({
  title,
  isSorted,
  onSort,
  className,
  align = "left",
}: DataTableColumnHeaderProps) {
  if (!onSort) {
    return (
      <div
        className={cn("font-medium", wrapperAlignmentClasses[align], className)}
      >
        {title}
      </div>
    );
  }

  return (
    <div className={cn("flex", alignmentClasses[align])}>
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
    </div>
  );
}
