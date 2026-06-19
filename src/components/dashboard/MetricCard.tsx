import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number | string; // Allowed string for pre-formatted numbers (e.g., "1,240" or "94%")
  icon: LucideIcon;
  trend?: string;
  trendType?: "up" | "down" | "neutral"; // Added for structural semantic colors
  accent?: "blue" | "green" | "amber" | "violet" | "slate";
}

const accentStyles = {
  blue: {
    border: "hover:border-blue-500/30",
    glow: "bg-blue-500/5 dark:bg-blue-400/5",
    iconBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-500/10",
  },
  green: {
    border: "hover:border-emerald-500/30",
    glow: "bg-emerald-500/5 dark:bg-emerald-400/5",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-500/10",
  },
  amber: {
    border: "hover:border-amber-500/30",
    glow: "bg-amber-500/5 dark:bg-amber-400/5",
    iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-500/10",
  },
  violet: {
    border: "hover:border-violet-500/30",
    glow: "bg-violet-500/5 dark:bg-violet-400/5",
    iconBg: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-500/10",
  },
  slate: {
    border: "hover:border-slate-500/30",
    glow: "bg-slate-500/5 dark:bg-slate-400/5",
    iconBg: "bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 border-slate-500/10",
  },
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  trendType = "neutral",
  accent = "blue",
}: MetricCardProps) {
  const styles = accentStyles[accent];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-md transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:bg-card hover:shadow-xl hover:shadow-shadow/5",
        styles.border
      )}
    >
      {/* Background Ambient Aura */}
      <div className={cn("absolute -bottom-10 -left-10 h-32 w-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", styles.glow)} />

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          {/* Label */}
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
            {title}
          </p>
          
          {/* Numerical Value */}
          <p className="text-3xl font-bold tracking-tight text-foreground group-hover:text-primary/95 transition-colors duration-300">
            {value}
          </p>
        </div>

        {/* Glossy Icon Container */}
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
            styles.iconBg
          )}
        >
          <Icon className="h-5 w-5 stroke-[2.25]" />
        </div>
      </div>

      {/* Modern Mini-Pill Trend Layout */}
      {trend && (
        <div className="mt-4 flex items-center">
          <span
            className={cn(
              "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border",
              trendType === "up" && "bg-emerald-500/5 text-emerald-600 border-emerald-500/10 dark:text-emerald-400",
              trendType === "down" && "bg-destructive/5 text-destructive border-destructive/10",
              trendType === "neutral" && "bg-muted text-muted-foreground border-border"
            )}
          >
            {trend}
          </span>
        </div>
      )}
    </div>
  );
}