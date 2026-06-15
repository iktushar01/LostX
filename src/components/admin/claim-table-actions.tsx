"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ClaimStatus } from "@/types/lostx.types";
import { updateClaimStatusAction } from "@/actions/lostx/claim.actions";
import { Eye } from "lucide-react";

interface ClaimTableActionsProps {
  claimId: string;
  status: ClaimStatus;
}

export function ClaimTableActions({ claimId, status }: ClaimTableActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<"APPROVED" | "REJECTED" | null>(null);

  const handleAction = async (nextStatus: "APPROVED" | "REJECTED") => {
    setLoading(nextStatus);
    const result = await updateClaimStatusAction(claimId, nextStatus);
    setLoading(null);

    if (!result.success) {
      toast.error(result.message ?? "Failed to update claim");
      return;
    }

    toast.success(nextStatus === "APPROVED" ? "Claim approved" : "Claim rejected");
    router.refresh();
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/admin/claims/${claimId}`}>
          <Eye className="mr-1 h-3.5 w-3.5" />
          View
        </Link>
      </Button>
      {status === "PENDING" && (
        <>
          <Button
            variant="outline"
            size="sm"
            disabled={loading !== null}
            onClick={() => handleAction("REJECTED")}
          >
            {loading === "REJECTED" && <Spinner className="mr-1" />}
            Reject
          </Button>
          <Button
            size="sm"
            disabled={loading !== null}
            onClick={() => handleAction("APPROVED")}
          >
            {loading === "APPROVED" && <Spinner className="mr-1" />}
            Approve
          </Button>
        </>
      )}
    </div>
  );
}
