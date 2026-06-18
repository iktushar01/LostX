"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { HandHelping } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { markFoundItemReturnedAction } from "@/actions/lostx/found-item.actions";

interface MarkReturnedButtonProps {
  itemId: string;
}

export function MarkReturnedButton({ itemId }: MarkReturnedButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMarkReturned = async () => {
    setLoading(true);
    const result = await markFoundItemReturnedAction(itemId);
    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Item marked as returned to owner");
    router.refresh();
  };

  return (
    <Button
      onClick={handleMarkReturned}
      disabled={loading}
      className="gap-2 bg-emerald-600 hover:bg-emerald-700"
    >
      {loading ? <Spinner className="h-4 w-4" /> : <HandHelping className="h-4 w-4" />}
      Mark as returned
    </Button>
  );
}
