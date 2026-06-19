import { Star } from "lucide-react";
import { UserReviewItem } from "@/types/lostx.types";
import { cn } from "@/lib/utils";

export function ReviewList({ reviews }: { reviews: UserReviewItem[] }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-muted-foreground">No reviews yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {reviews.map((review) => (
        <li key={review.id} className="rounded-xl border p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-sm">{review.reviewer.name}</p>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30",
                  )}
                />
              ))}
            </div>
          </div>
          {review.comment && (
            <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  );
}
