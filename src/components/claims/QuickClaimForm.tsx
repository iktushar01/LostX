"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { quickClaimSchema, QuickClaimInput } from "@/zod/lostx.validation";
import { createQuickClaimAction } from "@/actions/lostx/claim.actions";
import { CampusLocationPicker } from "@/components/shared/CampusLocationPicker";
import { ITEM_CATEGORIES } from "@/types/lostx.types";
import { formatLabel } from "@/components/shared/ItemBadges";

interface QuickClaimFormProps {
  foundItemId: string;
  onSuccess?: () => void;
}

export function QuickClaimForm({ foundItemId, onSuccess }: QuickClaimFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuickClaimInput>({
    resolver: zodResolver(quickClaimSchema),
    defaultValues: {
      foundItemId,
      title: "",
      description: "",
      category: "OTHER",
      location: "",
      dateLost: new Date().toISOString().slice(0, 10),
      verificationQuestion: "",
      verificationAnswer: "",
      answer: "",
    },
  });

  const location = watch("location");
  const category = watch("category");

  const onSubmit = async (values: QuickClaimInput) => {
    if (values.answer.trim().toLowerCase() !== values.verificationAnswer.trim().toLowerCase()) {
      toast.error("Your claim answer must match the verification answer you set.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        formData.append(key, String(value));
      }
    });

    const result = await createQuickClaimAction(formData);
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
    <form onSubmit={handleSubmit(onSubmit)} className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
      <p className="text-sm text-muted-foreground">
        No lost report yet? Create one inline and submit your claim in a single step.
      </p>

      <div className="space-y-2">
        <Label htmlFor="title">What did you lose?</Label>
        <Input id="title" {...register("title")} placeholder="e.g. Black student ID card" />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={3} {...register("description")} />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => setValue("category", v as QuickClaimInput["category"], { shouldValidate: true })}>
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
          <Input id="dateLost" type="date" {...register("dateLost")} />
        </div>
      </div>

      <CampusLocationPicker
        value={location}
        onChange={(v) => setValue("location", v, { shouldValidate: true })}
        onStructuredChange={(parts) => {
          if (parts.building) setValue("building", parts.building);
          if (parts.floor) setValue("floor", parts.floor);
          if (parts.room) setValue("room", parts.room);
        }}
        error={errors.location?.message}
      />

      <div className="space-y-2">
        <Label htmlFor="verificationQuestion">Verification question</Label>
        <Input
          id="verificationQuestion"
          {...register("verificationQuestion")}
          placeholder="e.g. What name is on the card?"
        />
        {errors.verificationQuestion && (
          <p className="text-sm text-destructive">{errors.verificationQuestion.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="verificationAnswer">Secret verification answer</Label>
        <Input
          id="verificationAnswer"
          {...register("verificationAnswer")}
          placeholder="Only you should know this"
        />
        {errors.verificationAnswer && (
          <p className="text-sm text-destructive">{errors.verificationAnswer.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="answer">Confirm your answer (for claim)</Label>
        <Input
          id="answer"
          {...register("answer")}
          placeholder="Type the same verification answer"
        />
        {errors.answer && <p className="text-sm text-destructive">{errors.answer.message}</p>}
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting && <Spinner className="mr-2" />}
        Submit Quick Claim
      </Button>
    </form>
  );
}
