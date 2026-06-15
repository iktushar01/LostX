"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ClaimStatus } from "@/types/lostx.types";
import { updateClaimStatusAction } from "@/actions/lostx/claim.actions";

interface ClaimActionsProps {
  claimId: string;
  status: ClaimStatus;
  redirectTo?: string;
}

export function ClaimActions({
  claimId,
  status,
  redirectTo = "/admin/claims",
}: ClaimActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<"APPROVED" | "REJECTED" | null>(null);

  if (status !== "PENDING") {
    return (
      <p className="text-sm text-muted-foreground">
        This claim has already been {status.toLowerCase()}.
      </p>
    );
  }

  const handleAction = async (nextStatus: "APPROVED" | "REJECTED") => {
    setLoading(nextStatus);
    const result = await updateClaimStatusAction(claimId, nextStatus);
    setLoading(null);

    if (!result.success) {
      toast.error(result.message ?? "Failed to update claim");
      return;
    }

    toast.success(
      nextStatus === "APPROVED"
        ? "Claim approved successfully"
        : "Claim rejected successfully",
    );
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        size="lg"
        disabled={loading !== null}
        onClick={() => handleAction("REJECTED")}
        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:hover:bg-red-950/30"
      >
        {loading === "REJECTED" && <Spinner className="mr-2" />}
        Reject
      </Button>
      <Button
        size="lg"
        disabled={loading !== null}
        onClick={() => handleAction("APPROVED")}
        className="bg-emerald-600 hover:bg-emerald-700"
      >
        {loading === "APPROVED" && <Spinner className="mr-2" />}
        Approve
      </Button>
    </div>
  );
}
