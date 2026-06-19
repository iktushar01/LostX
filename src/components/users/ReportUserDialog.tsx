"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { createUserReportAction } from "@/actions/lostx/user-profile.actions";
import { UserReportReason } from "@/types/lostx.types";

const REASONS: { value: UserReportReason; label: string }[] = [
  { value: "FAKE_LISTING", label: "Fake listing" },
  { value: "HARASSMENT", label: "Harassment" },
  { value: "SUSPICIOUS_CLAIM", label: "Suspicious claim" },
  { value: "IMPERSONATION", label: "Impersonation" },
  { value: "OTHER", label: "Other" },
];

interface ReportUserDialogProps {
  reportedId: string;
  reportedName: string;
  claimId?: string;
  lostItemId?: string;
  foundItemId?: string;
}

export function ReportUserDialog({
  reportedId,
  reportedName,
  claimId,
  lostItemId,
  foundItemId,
}: ReportUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<UserReportReason>("OTHER");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (details.trim().length < 10) {
      toast.error("Please provide at least 10 characters of detail.");
      return;
    }

    setSubmitting(true);
    const result = await createUserReportAction({
      reportedId,
      reason,
      details: details.trim(),
      claimId,
      lostItemId,
      foundItemId,
    });
    setSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Report submitted. Admins will review it.");
    setOpen(false);
    setDetails("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Flag className="h-4 w-4" />
          Report user
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report {reportedName}</DialogTitle>
          <DialogDescription>
            Reports are reviewed by campus admins. No public labels are applied automatically.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Reason</Label>
            <Select value={reason} onValueChange={(v) => setReason(v as UserReportReason)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REASONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Details</Label>
            <Textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe what happened..."
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? <Spinner className="h-4 w-4" /> : "Submit report"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
