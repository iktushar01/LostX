"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { createClaimSchema, CreateClaimInput } from "@/zod/lostx.validation";
import { createClaimAction } from "@/actions/lostx/claim.actions";

interface ClaimFormProps {
  foundItemId: string;
  onSuccess?: () => void;
}

export function ClaimForm({ foundItemId, onSuccess }: ClaimFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClaimInput>({
    resolver: zodResolver(createClaimSchema),
    defaultValues: { foundItemId, message: "" },
  });

  const onSubmit = async (values: CreateClaimInput) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append("foundItemId", values.foundItemId);
    formData.append("message", values.message);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">Ownership message</Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          placeholder="This wallet belongs to me. It contains my university ID card."
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting && <Spinner className="mr-2" />}
        Submit Claim
      </Button>
    </form>
  );
}
