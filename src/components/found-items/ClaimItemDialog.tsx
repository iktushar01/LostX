"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HandHelping } from "lucide-react";
import { ClaimForm } from "@/components/claims/ClaimForm";

interface ClaimItemDialogProps {
  foundItemId: string;
  itemTitle: string;
}

export function ClaimItemDialog({ foundItemId, itemTitle }: ClaimItemDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <HandHelping className="h-4 w-4" />
          Claim This Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Claim: {itemTitle}</DialogTitle>
          <DialogDescription>
            Select your lost item report and answer the verification question. An admin will review your claim.
          </DialogDescription>
        </DialogHeader>
        <ClaimForm foundItemId={foundItemId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
