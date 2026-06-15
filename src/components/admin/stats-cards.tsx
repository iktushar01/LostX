import { AdminStats } from "@/types/lostx.types";
import { MetricCard } from "@/components/dashboard/MetricCard";
import {
  ClipboardList,
  PackageSearch,
  FileCheck,
  Clock,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

interface StatsCardsProps {
  stats: AdminStats;
}

const statItems = [
  { key: "totalLostItems" as const, label: "Total Lost Items", icon: ClipboardList, accent: "amber" as const, trend: "All reports" },
  { key: "totalFoundItems" as const, label: "Total Found Items", icon: PackageSearch, accent: "blue" as const, trend: "All reports" },
  { key: "totalClaims" as const, label: "Total Claims", icon: FileCheck, accent: "slate" as const, trend: "All time" },
  { key: "pendingClaims" as const, label: "Pending Claims", icon: Clock, accent: "violet" as const, trend: "Needs review" },
  { key: "approvedClaims" as const, label: "Approved Claims", icon: CheckCircle2, accent: "green" as const, trend: "Verified ownership" },
  { key: "recoveredItems" as const, label: "Recovered Items", icon: RotateCcw, accent: "green" as const, trend: "Returned to owners" },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statItems.map(({ key, label, icon, accent, trend }) => (
        <MetricCard
          key={key}
          title={label}
          value={stats[key]}
          icon={icon}
          accent={accent}
          trend={trend}
        />
      ))}
    </div>
  );
}

export function StatsCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-xl border bg-muted/40" />
      ))}
    </div>
  );
}
