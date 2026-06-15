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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Lost Reports"
        value={stats.lostReports}
        icon={Search}
        accent="amber"
        trend="Your reported items"
      />
      <MetricCard
        title="Found Reports"
        value={stats.foundReports}
        icon={PackageSearch}
        accent="blue"
        trend="Items you've found"
      />
      <MetricCard
        title="Pending Claims"
        value={pendingClaims}
        icon={Clock}
        accent="violet"
        trend="Awaiting admin review"
      />
      <MetricCard
        title="Recovered Items"
        value={recoveredItems}
        icon={CheckCircle2}
        accent="green"
        trend="Successfully returned"
      />
    </div>
  );
}
