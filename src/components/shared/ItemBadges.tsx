import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function formatLabel(value: string) {
  return value.replace(/_/g, " ");
}

export function CategoryBadge({ category }: { category: string }) {
  return (
    <Badge variant="secondary" className="font-normal">
      {formatLabel(category)}
    </Badge>
  );
}

const statusColors: Record<string, string> = {
  OPEN: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  MATCHED: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  RECOVERED: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  AVAILABLE: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  CLAIMED: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  RETURNED: "bg-muted text-muted-foreground",
  PENDING: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  APPROVED: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  REJECTED: "bg-red-500/15 text-red-700 dark:text-red-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge className={cn("border-0 font-normal", statusColors[status] ?? "")}>
      {formatLabel(status)}
    </Badge>
  );
}

export function TypeBadge({ type }: { type: "lost" | "found" }) {
  return (
    <Badge variant={type === "lost" ? "destructive" : "default"}>
      {type === "lost" ? "Lost" : "Found"}
    </Badge>
  );
}
