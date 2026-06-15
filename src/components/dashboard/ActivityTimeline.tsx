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
  lost: { icon: Search, color: "bg-amber-500", ring: "ring-amber-500/20" },
  found: { icon: PackageSearch, color: "bg-blue-500", ring: "ring-blue-500/20" },
  claim: { icon: HandHelping, color: "bg-violet-500", ring: "ring-violet-500/20" },
  recovered: { icon: RotateCcw, color: "bg-emerald-500", ring: "ring-emerald-500/20" },
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
      <p className="py-8 text-center text-sm text-muted-foreground">
        No activity yet. Start by reporting a lost or found item.
      </p>
    );
  }

  return (
    <div className="relative space-y-0">
      {activities.map((activity, index) => {
        const config = typeConfig[activity.type];
        const Icon = config.icon;
        const isLast = index === activities.length - 1;

        return (
          <div key={activity.id} className="relative flex gap-4 pb-6">
            {!isLast && (
              <div className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-slate-200 dark:bg-slate-800" />
            )}
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4",
                config.color,
                config.ring,
              )}
            >
              <Icon className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="truncate text-sm text-muted-foreground">{activity.subtitle}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(activity.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            {activity.type === "recovered" && (
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
            )}
          </div>
        );
      })}
    </div>
  );
}
