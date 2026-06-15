"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { createClaimSchema, CreateClaimInput } from "@/zod/lostx.validation";
import { createClaimAction } from "@/actions/lostx/claim.actions";
import { getMyLostItemsForClaimAction } from "@/actions/lostx/lost-item.actions";
import { LostItemForClaim } from "@/types/lostx.types";
import { formatLabel } from "@/components/shared/ItemBadges";
import Link from "next/link";

interface ClaimFormProps {
  foundItemId: string;
  onSuccess?: () => void;
}

export function ClaimForm({ foundItemId, onSuccess }: ClaimFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [lostItems, setLostItems] = useState<LostItemForClaim[]>([]);
  const [loadingLostItems, setLoadingLostItems] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateClaimInput>({
    resolver: zodResolver(createClaimSchema),
    defaultValues: { foundItemId, lostItemId: "", answer: "" },
  });

  const selectedLostItemId = watch("lostItemId");
  const selectedLostItem = lostItems.find((item) => item.id === selectedLostItemId);

  useEffect(() => {
    getMyLostItemsForClaimAction().then((result) => {
      setLostItems(result.data ?? []);
      setLoadingLostItems(false);
    });
  }, []);

  const onSubmit = async (values: CreateClaimInput) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append("foundItemId", values.foundItemId);
    formData.append("lostItemId", values.lostItemId);
    formData.append("answer", values.answer);

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
          You need an open lost item report with a verification question before claiming.
        </p>
        <Button asChild>
          <Link href="/dashboard/lost/new">Report a lost item</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Your lost item report</Label>
        <Select
          value={selectedLostItemId}
          onValueChange={(value) => setValue("lostItemId", value, { shouldValidate: true })}
        >
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
        {errors.lostItemId && (
          <p className="text-sm text-destructive">{errors.lostItemId.message}</p>
        )}
      </div>

      {selectedLostItem?.verificationQuestion && (
        <div className="rounded-lg border bg-muted/40 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Verification question
          </p>
          <p className="mt-1 text-sm font-medium">{selectedLostItem.verificationQuestion}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="answer">Your answer</Label>
        <Textarea
          id="answer"
          rows={4}
          {...register("answer")}
          placeholder="Answer the verification question to prove ownership."
          disabled={!selectedLostItemId}
        />
        {errors.answer && (
          <p className="text-sm text-destructive">{errors.answer.message}</p>
        )}
      </div>

      <Button type="submit" disabled={submitting || !selectedLostItemId} className="w-full">
        {submitting && <Spinner className="mr-2" />}
        Submit Claim
      </Button>
    </form>
  );
}
