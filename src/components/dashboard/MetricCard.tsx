import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: string;
  accent?: "blue" | "green" | "amber" | "violet" | "slate";
}

const accentStyles = {
  blue: {
    icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    trend: "text-blue-600 dark:text-blue-400",
  },
  green: {
    icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    trend: "text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    trend: "text-amber-600 dark:text-amber-400",
  },
  violet: {
    icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    trend: "text-violet-600 dark:text-violet-400",
  },
  slate: {
    icon: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    trend: "text-slate-600 dark:text-slate-400",
  },
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  accent = "blue",
}: MetricCardProps) {
  const styles = accentStyles[accent];

  return (
    <Card className="overflow-hidden border-slate-200/80 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {trend && (
              <p className={cn("text-xs font-medium", styles.trend)}>{trend}</p>
            )}
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", styles.icon)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
