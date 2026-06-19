"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { createUserReviewAction } from "@/actions/lostx/user-profile.actions";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewHandoffFormProps {
  revieweeId: string;
  revieweeName: string;
  eligibleClaims: { claimId: string; itemTitle: string }[];
}

export function ReviewHandoffForm({
  revieweeId,
  revieweeName,
  eligibleClaims,
}: ReviewHandoffFormProps) {
  const [claimId, setClaimId] = useState(eligibleClaims[0]?.claimId ?? "");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (eligibleClaims.length === 0) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!claimId) return;

    setSubmitting(true);
    const result = await createUserReviewAction(revieweeId, {
      claimId,
      rating,
      comment: comment.trim() || undefined,
    });
    setSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(`Thanks for reviewing ${revieweeName}.`);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-dashed p-4 space-y-4">
      <div>
        <p className="font-medium">Rate your experience</p>
        <p className="text-sm text-muted-foreground">
          Handoff complete — leave a review for {revieweeName}.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Handoff</Label>
        <Select value={claimId} onValueChange={setClaimId}>
          <SelectTrigger>
            <SelectValue placeholder="Select claim" />
          </SelectTrigger>
          <SelectContent>
            {eligibleClaims.map((claim) => (
              <SelectItem key={claim.claimId} value={claim.claimId}>
                {claim.itemTitle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="rounded p-1 hover:bg-muted"
              >
                <Star
                  className={cn(
                    "h-5 w-5",
                    value <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Comment (optional)</Label>
        <Textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? <Spinner className="h-4 w-4" /> : "Submit review"}
      </Button>
    </form>
  );
}
