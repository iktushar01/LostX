"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { ClaimMessage } from "@/types/lostx.types";
import { sendClaimMessageAction } from "@/actions/lostx/claim.actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ClaimChatPanelProps {
  claimId: string;
  currentUserId: string;
  messages: ClaimMessage[];
}

export function ClaimChatPanel({ claimId, currentUserId, messages }: ClaimChatPanelProps) {
  const [pending, startTransition] = useTransition();
  const [draft, setDraft] = useState("");

  const sortedMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    [messages],
  );

  const handleSend = () => {
    if (!draft.trim()) return;

    startTransition(async () => {
      const result = await sendClaimMessageAction(claimId, draft.trim());
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      setDraft("");
      toast.success("Message sent");
    });
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-card p-4 dark:border-slate-800">
      <div className="space-y-1">
        <h3 className="font-semibold">Claim Chat</h3>
        <p className="text-sm text-muted-foreground">
          Coordinate handoff details with the finder/claimer after approval.
        </p>
      </div>
      <div className="max-h-80 space-y-2 overflow-y-auto rounded-xl border bg-muted/20 p-3">
        {sortedMessages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No messages yet. Start the handoff conversation.
          </p>
        ) : (
          sortedMessages.map((message) => {
            const mine = message.senderId === currentUserId;
            return (
              <div key={message.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    mine
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-foreground dark:border-slate-700 dark:bg-slate-900"
                  }`}
                >
                  <p className="mb-1 text-xs opacity-80">
                    {message.sender?.name ?? "User"} •{" "}
                    {new Date(message.createdAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="space-y-2">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="Share pickup place/time or contact details..."
        />
        <Button onClick={handleSend} disabled={pending || !draft.trim()}>
          {pending ? "Sending..." : "Send message"}
        </Button>
      </div>
    </div>
  );
}

