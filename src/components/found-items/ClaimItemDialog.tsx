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
import { HandHelping, Zap } from "lucide-react";
import { ClaimForm } from "@/components/claims/ClaimForm";
import { QuickClaimForm } from "@/components/claims/QuickClaimForm";
import { cn } from "@/lib/utils";

interface ClaimItemDialogProps {
  foundItemId: string;
  itemTitle: string;
  size?: "default" | "lg";
}

export function ClaimItemDialog({ foundItemId, itemTitle, size = "default" }: ClaimItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"existing" | "quick">("existing");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={size === "lg" ? "h-12 w-full gap-2 text-base font-semibold" : "gap-2"} size={size === "lg" ? "lg" : "default"}>
          <HandHelping className="h-5 w-5" />
          Claim This Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Claim: {itemTitle}</DialogTitle>
          <DialogDescription>
            Staff will review your verification answers and approve or reject the claim.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted/50 p-1">
          <button
            type="button"
            onClick={() => setMode("existing")}
            className={cn(
              "rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
              mode === "existing" ? "bg-background shadow-sm" : "text-muted-foreground",
            )}
          >
            Use lost report
          </button>
          <button
            type="button"
            onClick={() => setMode("quick")}
            className={cn(
              "flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
              mode === "quick" ? "bg-background shadow-sm" : "text-muted-foreground",
            )}
          >
            <Zap className="h-3 w-3" />
            Quick claim
          </button>
        </div>

        {mode === "existing" ? (
          <ClaimForm foundItemId={foundItemId} onSuccess={() => setOpen(false)} />
        ) : (
          <QuickClaimForm foundItemId={foundItemId} onSuccess={() => setOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
