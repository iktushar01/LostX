import { AdminStats } from "@/types/lostx.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardList,
  PackageSearch,
  FileCheck,
  Clock,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

interface StatsCardsProps {
  stats: AdminStats;
}

const statItems = [
  {
    key: "totalLostItems" as const,
    label: "Total Lost Items",
    icon: ClipboardList,
    href: "/dashboard/lost",
  },
  {
    key: "totalFoundItems" as const,
    label: "Total Found Items",
    icon: PackageSearch,
    href: "/dashboard/found",
  },
  {
    key: "totalClaims" as const,
    label: "Total Claims",
    icon: FileCheck,
    href: "/admin/claims",
  },
  {
    key: "pendingClaims" as const,
    label: "Pending Claims",
    icon: Clock,
    href: "/admin/claims?status=PENDING",
  },
  {
    key: "approvedClaims" as const,
    label: "Approved Claims",
    icon: CheckCircle2,
    href: "/admin/claims?status=APPROVED",
  },
  {
    key: "recoveredItems" as const,
    label: "Recovered Items",
    icon: RotateCcw,
    href: "/dashboard/lost",
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statItems.map(({ key, label, icon: Icon, href }) => (
        <Link key={key} href={href}>
          <Card className="transition-colors hover:bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats[key]}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function StatsCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          </CardHeader>
          <CardContent>
            <div className="h-9 w-16 animate-pulse rounded bg-muted" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
