import Link from "next/link";
import { Claim, ClaimStatus } from "@/types/lostx.types";
import { StatusBadge } from "@/components/shared/ItemBadges";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Circle, X } from "lucide-react";

interface ClaimCardProps {
  claim: Claim;
}

const steps: { key: string; label: string }[] = [
  { key: "submitted", label: "Submitted" },
  { key: "review", label: "Under Review" },
  { key: "decision", label: "Decision" },
];

function getStepState(status: ClaimStatus, stepIndex: number): "done" | "current" | "pending" | "rejected" {
  if (status === "REJECTED") {
    if (stepIndex === 0) return "done";
    if (stepIndex === 1) return "done";
    return "rejected";
  }
  if (status === "APPROVED") {
    return "done";
  }
  if (stepIndex === 0) return "done";
  if (stepIndex === 1) return "current";
  return "pending";
}

export function ClaimCard({ claim }: ClaimCardProps) {
  const itemTitle = claim.foundItem?.title ?? "Found item";

  return (
    <Card className="overflow-hidden border-slate-200/80 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/dashboard/found/${claim.foundItemId}`}
              className="font-semibold tracking-tight hover:text-primary hover:underline"
            >
              {itemTitle}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Submitted {new Date(claim.createdAt).toLocaleDateString()}
            </p>
          </div>
          <StatusBadge status={claim.status} />
        </div>

        <div className="mt-6 flex items-center justify-between gap-2">
          {steps.map((step, index) => {
            const state = getStepState(claim.status, index);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.key} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors",
                      state === "done" && "border-emerald-500 bg-emerald-500 text-white",
                      state === "current" && "border-blue-500 bg-blue-500/10 text-blue-600",
                      state === "pending" && "border-slate-200 text-slate-400 dark:border-slate-700",
                      state === "rejected" && "border-red-500 bg-red-500 text-white",
                    )}
                  >
                    {state === "done" && <Check className="h-3.5 w-3.5" />}
                    {state === "current" && <Circle className="h-3 w-3 fill-current" />}
                    {state === "pending" && <span>{index + 1}</span>}
                    {state === "rejected" && <X className="h-3.5 w-3.5" />}
                  </div>
                  <span className="text-center text-[10px] font-medium text-muted-foreground sm:text-xs">
                    {state === "rejected" && index === 2 ? "Rejected" : step.label}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "mx-1 h-0.5 flex-1",
                      state === "done" ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700",
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        <Button variant="outline" size="sm" className="mt-5 w-full" asChild>
          <Link href={`/dashboard/found/${claim.foundItemId}`}>View Item</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
