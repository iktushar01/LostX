"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryBadge } from "@/components/shared/ItemBadges";
import { ScoredMatch } from "@/types/lostx.types";

interface SuggestedMatchesProps {
  matches: ScoredMatch[];
  currentType: "lost" | "found";
}

export function SuggestedMatches({ matches, currentType }: SuggestedMatchesProps) {
  if (!matches.length) return null;

  return (
    <Card className="border-violet-200/80 bg-violet-50/30 dark:border-violet-900/50 dark:bg-violet-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          Suggested matches
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {currentType === "lost"
            ? "Found items that may match this lost report"
            : "Lost reports that may match this found item"}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {matches.map((match) => {
          const href =
            match.itemType === "lost"
              ? `/dashboard/lost/${match.id}`
              : `/dashboard/found/${match.id}`;

          return (
            <Link
              key={`${match.itemType}-${match.id}`}
              href={href}
              className="flex items-start justify-between gap-3 rounded-xl border border-violet-100 bg-white/80 p-3 transition-colors hover:border-violet-200 hover:bg-white dark:border-violet-900/40 dark:bg-slate-900/40 dark:hover:bg-slate-900"
            >
              <div className="min-w-0 space-y-1">
                <p className="truncate font-medium">{match.title}</p>
                <p className="truncate text-xs text-muted-foreground">{match.location}</p>
                <CategoryBadge category={match.category} />
              </div>
              <Badge
                variant="secondary"
                className="shrink-0 bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"
              >
                {match.score}% match
              </Badge>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
