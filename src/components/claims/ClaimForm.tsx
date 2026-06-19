"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createClaimAction,
  generateVerificationQuestionsAction,
} from "@/actions/lostx/claim.actions";
import { getMyLostItemsForClaimAction } from "@/actions/lostx/lost-item.actions";
import { AiVerificationQuestion, LostItemForClaim } from "@/types/lostx.types";
import { formatLabel } from "@/components/shared/ItemBadges";
import Link from "next/link";

interface ClaimFormProps {
  foundItemId: string;
  onSuccess?: () => void;
}

export function ClaimForm({ foundItemId, onSuccess }: ClaimFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [lostItems, setLostItems] = useState<LostItemForClaim[]>([]);
  const [loadingLostItems, setLoadingLostItems] = useState(true);
  const [lostItemId, setLostItemId] = useState("");
  const [questions, setQuestions] = useState<AiVerificationQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [legacyAnswer, setLegacyAnswer] = useState("");

  const selectedLostItem = lostItems.find((item) => item.id === lostItemId);
  const usesAiFlow = selectedLostItem?.hasPrivateDetails === true;

  useEffect(() => {
    getMyLostItemsForClaimAction().then((result) => {
      setLostItems(result.data ?? []);
      setLoadingLostItems(false);
    });
  }, []);

  useEffect(() => {
    setQuestions([]);
    setAnswers({});
    setLegacyAnswer("");
  }, [lostItemId]);

  const loadQuestions = async () => {
    if (!lostItemId) return;
    setLoadingQuestions(true);
    const result = await generateVerificationQuestionsAction(foundItemId, lostItemId);
    setLoadingQuestions(false);

    if (!result.success || !result.data?.questions?.length) {
      toast.error(result.message ?? "Could not generate verification questions");
      return;
    }

    setQuestions(result.data.questions);
    setAnswers({});
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lostItemId) return;

    setSubmitting(true);
    const formData = new FormData();
    formData.append("foundItemId", foundItemId);
    formData.append("lostItemId", lostItemId);

    if (usesAiFlow && questions.length > 0) {
      formData.append("aiQuestions", JSON.stringify(questions));
      formData.append(
        "aiAnswers",
        JSON.stringify(
          questions.map((q) => ({ id: q.id, answer: answers[q.id]?.trim() ?? "" })),
        ),
      );
    } else {
      formData.append("answer", legacyAnswer);
    }

    const result = await createClaimAction(formData);
    setSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Claim submitted successfully!");
    onSuccess?.();
    router.push("/claims");
    router.refresh();
  };

  if (loadingLostItems) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (lostItems.length === 0) {
    return (
      <div className="space-y-4 text-sm">
        <p className="text-muted-foreground">
          Report a lost item with private details before claiming a found item.
        </p>
        <Button asChild>
          <Link href="/dashboard/lost/new">Report a lost item</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Your lost item report</Label>
        <Select value={lostItemId} onValueChange={setLostItemId}>
          <SelectTrigger>
            <SelectValue placeholder="Select your lost report" />
          </SelectTrigger>
          <SelectContent>
            {lostItems.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.title} ({formatLabel(item.category)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {lostItemId && usesAiFlow && (
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            disabled={loadingQuestions}
            onClick={loadQuestions}
            className="w-full"
          >
            {loadingQuestions ? <Spinner className="mr-2 h-4 w-4" /> : null}
            Generate AI verification questions
          </Button>

          {questions.map((q) => (
            <div key={q.id} className="space-y-1.5">
              <Label htmlFor={`answer-${q.id}`}>{q.question}</Label>
              <Input
                id={`answer-${q.id}`}
                value={answers[q.id] ?? ""}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                }
                placeholder="Your answer"
              />
            </div>
          ))}
        </div>
      )}

      {lostItemId && !usesAiFlow && selectedLostItem?.verificationQuestion && (
        <div className="space-y-2">
          <div className="rounded-lg border bg-muted/40 p-3 text-sm">
            <p className="text-xs font-medium uppercase text-muted-foreground">Legacy question</p>
            <p className="mt-1 font-medium">{selectedLostItem.verificationQuestion}</p>
          </div>
          <Label htmlFor="legacyAnswer">Your answer</Label>
          <Textarea
            id="legacyAnswer"
            rows={3}
            value={legacyAnswer}
            onChange={(e) => setLegacyAnswer(e.target.value)}
          />
        </div>
      )}

      <Button
        type="submit"
        disabled={
          submitting ||
          !lostItemId ||
          (usesAiFlow
            ? questions.length === 0 ||
              questions.some((q) => !answers[q.id]?.trim())
            : !legacyAnswer.trim())
        }
        className="w-full"
      >
        {submitting && <Spinner className="mr-2" />}
        Submit Claim
      </Button>
    </form>
  );
}
