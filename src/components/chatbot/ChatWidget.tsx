"use client";

import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Bot, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { sendChatMessageAction } from "@/actions/lostx/chatbot.actions";
import { ChatbotMatch } from "@/types/lostx.types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CategoryBadge } from "@/components/shared/ItemBadges";
import { cn } from "@/lib/utils";

type ChatEntry =
  | { id: string; role: "user"; content: string }
  | { id: string; role: "assistant"; content: string; matches: ChatbotMatch[] };

const STARTER_PROMPTS = [
  "I lost my black calculator near EEE building yesterday",
  "Has anyone found a student ID card?",
  "Show found phones on campus",
];

function formatConfidence(match: ChatbotMatch) {
  return `${Math.round(match.score ?? match.similarity * 100)}%`;
}

function MatchCard({ match }: { match: ChatbotMatch }) {
  const href =
    match.type === "LOST"
      ? `/dashboard/lost/${match.id}`
      : `/dashboard/found/${match.id}`;

  return (
    <Link
      href={href}
      className="block rounded-xl border border-violet-100 bg-white/90 p-3 transition-colors hover:border-violet-200 hover:bg-white dark:border-violet-900/40 dark:bg-slate-900/50 dark:hover:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 space-y-1">
          <p className="truncate text-sm font-medium">{match.title}</p>
          <p className="truncate text-xs text-muted-foreground">{match.location}</p>
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={match.category} />
            <Badge variant="outline" className="text-[10px] uppercase">
              {match.type}
            </Badge>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="shrink-0 bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"
        >
          {formatConfidence(match)}
        </Badge>
      </div>
    </Link>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [entries, setEntries] = useState<ChatEntry[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm the LostX assistant. Tell me what you lost or what you're looking for, and I'll search campus listings for possible matches.",
      matches: [],
    },
  ]);
  const [pending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const userId = crypto.randomUUID();
    setEntries((prev) => [...prev, { id: userId, role: "user", content: trimmed }]);
    setDraft("");
    scrollToBottom();

    startTransition(async () => {
      const result = await sendChatMessageAction(trimmed);

      if (!result.success || !result.data) {
        toast.error(result.message);
        setEntries((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: result.message,
            matches: [],
          },
        ]);
        scrollToBottom();
        return;
      }

      setEntries((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: result.data.answer,
          matches: result.data.matches,
        },
      ]);
      scrollToBottom();
    });
  };

  return (
    <>
      {!open && (
        <Button
          type="button"
          size="lg"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 p-0 shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-cyan-600"
          aria-label="Open LostX assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[min(640px,calc(100vh-3rem))] w-[min(420px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-background shadow-2xl dark:border-slate-800">
          <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">LostX Assistant</p>
                <p className="text-xs text-white/80">AI lost & found search</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="text-white hover:bg-white/15 hover:text-white"
              aria-label="Close assistant"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className={cn("flex", entry.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[92%] space-y-2 rounded-2xl px-3 py-2 text-sm",
                    entry.role === "user"
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-muted/30 text-foreground dark:border-slate-800",
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{entry.content}</p>

                  {entry.role === "assistant" && entry.matches.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <p className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5" />
                        Possible matches
                      </p>
                      {entry.matches.map((match) => (
                        <MatchCard key={`${match.type}-${match.id}`} match={match} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {pending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-muted/30 px-3 py-2 text-sm text-muted-foreground dark:border-slate-800">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching listings...
                </div>
              </div>
            )}
          </div>

          {entries.length === 1 && (
            <div className="flex flex-wrap gap-2 border-t px-4 py-3">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={pending}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:border-blue-200 hover:text-foreground dark:border-slate-800 dark:bg-slate-900"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div className="border-t p-4">
            <div className="flex items-end gap-2">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Describe what you lost or what you're looking for..."
                rows={2}
                disabled={pending}
                className="min-h-[72px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(draft);
                  }
                }}
              />
              <Button
                type="button"
                size="icon"
                disabled={pending || !draft.trim()}
                onClick={() => sendMessage(draft)}
                className="h-10 w-10 shrink-0"
              >
                {pending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
