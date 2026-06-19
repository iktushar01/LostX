import { Claim, LostItem, FoundItem } from "@/types/lostx.types";
import {
  Search,
  HandHelping,
  CheckCircle2,
  PackageSearch,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ActivityItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  type: "lost" | "found" | "claim" | "recovered";
};

interface ActivityTimelineProps {
  lostItems: LostItem[];
  foundItems: FoundItem[];
  claims: Claim[];
}

const typeConfig = {
  lost: { icon: Search, nodeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 group-hover/item:border-amber-500/50" },
  found: { icon: PackageSearch, nodeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 group-hover/item:border-blue-500/50" },
  claim: { icon: HandHelping, nodeClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20 group-hover/item:border-violet-500/50" },
  recovered: { icon: RotateCcw, nodeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 group-hover/item:border-emerald-500/50" },
};

function buildActivities(
  lostItems: LostItem[],
  foundItems: FoundItem[],
  claims: Claim[],
): ActivityItem[] {
  const items: ActivityItem[] = [];

  lostItems.forEach((item) => {
    items.push({
      id: `lost-${item.id}`,
      title: item.status === "RECOVERED" ? "Item Recovered" : "Lost Item Reported",
      subtitle: item.title,
      date: item.createdAt,
      type: item.status === "RECOVERED" ? "recovered" : "lost",
    });
  });

  foundItems.forEach((item) => {
    items.push({
      id: `found-${item.id}`,
      title: "Found Item Reported",
      subtitle: item.title,
      date: item.createdAt,
      type: "found",
    });
  });

  claims.forEach((claim) => {
    const statusLabel =
      claim.status === "APPROVED"
        ? "Claim Approved"
        : claim.status === "REJECTED"
          ? "Claim Rejected"
          : "Claim Submitted";

    items.push({
      id: `claim-${claim.id}`,
      title: statusLabel,
      subtitle: claim.foundItem?.title ?? "Found item",
      date: claim.createdAt,
      type: claim.status === "APPROVED" ? "recovered" : "claim",
    });
  });

  return items
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);
}

export function ActivityTimeline({ lostItems, foundItems, claims }: ActivityTimelineProps) {
  const activities = buildActivities(lostItems, foundItems, claims);

  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-muted-foreground max-w-xs">
          No activity recorded yet. Reported lost or found items will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="relative space-y-1 pl-1">
      {activities.map((activity, index) => {
        const config = typeConfig[activity.type];
        const Icon = config.icon;
        const isLast = index === activities.length - 1;

        return (
          <div key={activity.id} className="group/item relative flex gap-4 pb-6 last:pb-2">
            {/* Minimalist Timeline Track Line */}
            {!isLast && (
              <div className="absolute left-[17px] top-9 h-[calc(100%-12px)] w-[1.5px] bg-gradient-to-b from-border/80 to-border/10 dark:from-border/40 dark:to-transparent" />
            )}

            {/* Glowing Glass Icon Node */}
            <div
              className={cn(
                "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 ease-out",
                config.nodeClass
              )}
            >
              <Icon className="h-4 w-4 stroke-[2]" />
            </div>

            {/* Content Context Block */}
            <div className="flex-1 min-w-0 rounded-xl border border-transparent p-1 -mt-1 transition-all duration-300 group-hover/item:border-border/40 group-hover/item:bg-muted/30 group-hover/item:px-3">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold tracking-tight text-foreground/90 group-hover/item:text-primary transition-colors">
                    {activity.title}
                  </h4>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground/90">
                    {activity.subtitle}
                  </p>
                </div>

                {/* Right Aligned Meta Tags */}
                <div className="flex items-center gap-2 shrink-0 pt-0.5">
                  <time className="text-[11px] font-medium tracking-wide uppercase text-muted-foreground/60 bg-muted/50 dark:bg-muted/20 rounded-md px-2 py-0.5 border border-border/30">
                    {new Date(activity.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  {activity.type === "recovered" && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}