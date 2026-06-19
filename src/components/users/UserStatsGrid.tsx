import { Card, CardContent } from "@/components/ui/card";

interface UserStatsGridProps {
  stats: Record<string, number>;
  labels: Record<string, string>;
}

export function UserStatsGrid({ stats, labels }: UserStatsGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(stats).map(([key, value]) => (
        <Card key={key} className="border-slate-200/80 dark:border-slate-800">
          <CardContent className="p-4">
            <p className="text-2xl font-bold tabular-nums">{value}</p>
            <p className="text-xs text-muted-foreground">{labels[key] ?? key}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
