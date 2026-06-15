import { StatsCardsSkeleton } from "@/components/admin/stats-cards";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <StatsCardsSkeleton />
      <Skeleton className="h-36 w-full rounded-xl" />
    </div>
  );
}
