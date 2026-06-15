import { ClaimsTableSkeleton } from "@/components/admin/claims-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminClaimsLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>
      <ClaimsTableSkeleton />
    </div>
  );
}
