"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { confirmClaimReceivedAction } from "@/actions/lostx/claim.actions";

interface ConfirmReceivedButtonProps {
  claimId: string;
  alreadyConfirmed?: boolean;
}

export function ConfirmReceivedButton({ claimId, alreadyConfirmed }: ConfirmReceivedButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmed, setConfirmed] = useState(alreadyConfirmed ?? false);

  if (confirmed) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
        <CheckCircle2 className="h-4 w-4" />
        You confirmed receipt. The finder can mark the item as returned.
      </div>
    );
  }

  return (
    <Button
      className="w-full gap-2"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          const result = await confirmClaimReceivedAction(claimId);
          if (!result.success) {
            toast.error(result.message);
            return;
          }
          toast.success("Receipt confirmed!");
          setConfirmed(true);
          router.refresh();
        });
      }}
    >
      {pending ? <Spinner className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
      I received my item
    </Button>
  );
}
