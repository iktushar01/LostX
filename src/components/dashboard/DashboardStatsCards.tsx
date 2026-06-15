import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDashboardStats } from "@/types/lostx.types";
import { CheckCircle2, PackageSearch, Search } from "lucide-react";

interface DashboardStatsCardsProps {
  stats: UserDashboardStats;
}

const cards = [
  {
    key: "lostReports" as const,
    title: "Lost Reports",
    icon: Search,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    key: "foundReports" as const,
    title: "Found Reports",
    icon: PackageSearch,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    key: "approvedClaims" as const,
    title: "Approved Claims",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
];

export function DashboardStatsCards({ stats }: DashboardStatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map(({ key, title, icon: Icon, color, bg }) => (
        <Card key={key}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${bg}`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats[key]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
