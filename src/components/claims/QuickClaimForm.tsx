"use client";

import { useState } from "react";
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
import { createQuickClaimAction, generateQuickVerificationQuestionsAction } from "@/actions/lostx/claim.actions";
import { CampusLocationPicker } from "@/components/shared/CampusLocationPicker";
import { AiVerificationQuestion, ITEM_CATEGORIES } from "@/types/lostx.types";
import { formatLabel } from "@/components/shared/ItemBadges";
import { defaultVisibilityForCategory } from "@/zod/lostx.validation";

interface QuickClaimFormProps {
  foundItemId: string;
  onSuccess?: () => void;
}

export function QuickClaimForm({ foundItemId, onSuccess }: QuickClaimFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privateDescription, setPrivateDescription] = useState("");
  const [category, setCategory] = useState<(typeof ITEM_CATEGORIES)[number]>("OTHER");
  const [location, setLocation] = useState("");
  const [dateLost, setDateLost] = useState(new Date().toISOString().slice(0, 10));
  const [questions, setQuestions] = useState<AiVerificationQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const loadQuestions = async () => {
    if (!title.trim() || !description.trim() || !privateDescription.trim()) {
      toast.error("Fill in title, public summary, and private details first.");
      return;
    }
    setLoadingQuestions(true);
    const result = await generateQuickVerificationQuestionsAction({
      foundItemId,
      title,
      description,
      privateDescription,
    });
    setLoadingQuestions(false);
    if (!result.success || !result.data?.questions?.length) {
      toast.error(result.message ?? "Could not generate questions");
      return;
    }
    setQuestions(result.data.questions);
    setAnswers({});
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length === 0) {
      toast.error("Generate verification questions first.");
      return;
    }

    setSubmitting(true);
    const visibility = defaultVisibilityForCategory(category);
    const result = await createQuickClaimAction({
      foundItemId,
      title,
      description,
      privateDescription,
      category,
      location,
      dateLost,
      showImagePublic: visibility.showImagePublic,
      showDescriptionPublic: visibility.showDescriptionPublic,
      showLocationPublic: visibility.showLocationPublic,
      aiQuestions: questions,
      aiAnswers: questions.map((q) => ({ id: q.id, answer: answers[q.id]?.trim() ?? "" })),
    });
    setSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message ?? "Quick claim submitted!");
    onSuccess?.();
    router.push("/claims");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
      <p className="text-sm text-muted-foreground">
        Create a lost report inline with encrypted private details, then verify with AI.
      </p>

      <div className="space-y-2">
        <Label htmlFor="title">What did you lose?</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Public summary</Label>
        <Textarea id="description" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="privateDescription">Private details (encrypted)</Label>
        <Textarea
          id="privateDescription"
          rows={3}
          value={privateDescription}
          onChange={(e) => setPrivateDescription(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as typeof category)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {ITEM_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>{formatLabel(cat)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateLost">Date lost</Label>
          <Input id="dateLost" type="date" value={dateLost} onChange={(e) => setDateLost(e.target.value)} />
        </div>
      </div>

      <CampusLocationPicker value={location} onChange={setLocation} />

      <Button type="button" variant="outline" className="w-full" disabled={loadingQuestions} onClick={loadQuestions}>
        {loadingQuestions && <Spinner className="mr-2 h-4 w-4" />}
        Generate AI verification questions
      </Button>

      {questions.map((q) => (
        <div key={q.id} className="space-y-1.5">
          <Label>{q.question}</Label>
          <Input
            value={answers[q.id] ?? ""}
            onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
          />
        </div>
      ))}

      <Button
        type="submit"
        disabled={
          submitting ||
          questions.length === 0 ||
          questions.some((q) => !answers[q.id]?.trim())
        }
        className="w-full"
      >
        {submitting && <Spinner className="mr-2" />}
        Submit Quick Claim
      </Button>
    </form>
  );
}
