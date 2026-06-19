import { Search, PackageSearch, Clock, CheckCircle2 } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { UserDashboardStats } from "@/types/lostx.types";

interface DashboardStatsProps {
  stats: UserDashboardStats;
  pendingClaims: number;
  recoveredItems: number;
}

export function DashboardStatsCards({
  stats,
  pendingClaims,
  recoveredItems,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Lost Reports"
        value={stats.lostReports}
        icon={Search}
        accent="amber"
        trend="Your reports"
        trendType="neutral"
      />
      <MetricCard
        title="Found Reports"
        value={stats.foundReports}
        icon={PackageSearch}
        accent="blue"
        trend="Items you found"
        trendType="neutral"
      />
      <MetricCard
        title="Pending Claims"
        value={pendingClaims}
        icon={Clock}
        accent="violet"
        trend={pendingClaims > 0 ? "Awaiting review" : "All caught up"}
        trendType={pendingClaims > 0 ? "down" : "neutral"} 
      />
      <MetricCard
        title="Recovered Items"
        value={recoveredItems}
        icon={CheckCircle2}
        accent="green"
        trend="Successfully returned"
        trendType={recoveredItems > 0 ? "up" : "neutral"}
      />
    </div>
  );
}