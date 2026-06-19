"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { getDraftMatchesAction } from "@/actions/lostx/match.actions";
import { ScoredMatch } from "@/types/lostx.types";
import { formatLabel } from "@/components/shared/ItemBadges";

interface MatchingLostReportsProps {
  title: string;
  description: string;
  category: string;
  location: string;
  dateFound: string;
  linkedLostItemId: string | null;
  onLink: (lostItemId: string, lostTitle: string) => void;
  onClearLink: () => void;
}

export function MatchingLostReports({
  title,
  description,
  category,
  location,
  dateFound,
  linkedLostItemId,
  onLink,
  onClearLink,
}: MatchingLostReportsProps) {
  const [matches, setMatches] = useState<ScoredMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [linkedTitle, setLinkedTitle] = useState<string | null>(null);

  useEffect(() => {
    const canSearch =
      title.trim().length >= 2 &&
      description.trim().length >= 5 &&
      location.trim().length >= 2 &&
      dateFound;

    if (!canSearch) {
      setMatches([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const result = await getDraftMatchesAction({
        title: title.trim(),
        description: description.trim(),
        category,
        location: location.trim(),
        dateFound,
      });
      setMatches(result.data ?? []);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [title, description, category, location, dateFound]);

  if (linkedLostItemId) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
        <p className="text-sm font-medium flex items-center gap-2">
          <Link2 className="h-4 w-4 text-primary" />
          Linked to lost report
        </p>
        <p className="text-sm text-muted-foreground">
          {linkedTitle ?? "Selected lost report"} — the owner will be notified when you submit.
        </p>
        <Button type="button" variant="outline" size="sm" onClick={onClearLink}>
          Unlink and post separately
        </Button>
      </div>
    );
  }

  if (!title.trim() || !description.trim() || !location.trim()) {
    return null;
  }

  return (
    <div className="rounded-xl border border-dashed p-4 space-y-3">
      <p className="text-sm font-medium flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-amber-500" />
        Matching lost reports
      </p>
      <p className="text-xs text-muted-foreground">
        Link your found report to an existing lost post so the owner is notified to claim.
      </p>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner className="h-4 w-4" /> Searching...
        </div>
      ) : matches.length === 0 ? (
        <p className="text-sm text-muted-foreground">No matching lost reports yet.</p>
      ) : (
        <ul className="space-y-2">
          {matches.map((match) => (
            <li
              key={match.id}
              className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-sm truncate">{match.title}</span>
                  <Badge variant="secondary">{match.score}% match</Badge>
                  <Badge variant="outline">{formatLabel(match.category)}</Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{match.location}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button type="button" size="sm" variant="outline" asChild>
                  <Link href={`/dashboard/lost/${match.id}`} target="_blank">
                    View
                  </Link>
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setLinkedTitle(match.title);
                    onLink(match.id, match.title);
                  }}
                >
                  Link to this lost report
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
