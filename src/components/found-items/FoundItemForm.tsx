"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { createFoundItemSchema, CreateFoundItemInput } from "@/zod/lostx.validation";
import { ITEM_CATEGORIES } from "@/types/lostx.types";
import { formatLabel } from "@/components/shared/ItemBadges";
import { createFoundItemAction } from "@/actions/lostx/found-item.actions";

export function FoundItemForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateFoundItemInput>({
    resolver: zodResolver(createFoundItemSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "OTHER",
      imageUrl: "",
      location: "",
      dateFound: new Date().toISOString().split("T")[0],
    },
  });

  const category = watch("category");

  const onSubmit = async (values: CreateFoundItemInput) => {
    setSubmitting(true);
    const formData = new FormData();
    Object.entries(values).forEach(([k, v]) => formData.append(k, String(v ?? "")));

    const result = await createFoundItemAction(formData);
    setSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Found item reported!");
    router.push(`/dashboard/found/${result.data?.id}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} placeholder="e.g. iPhone 14" />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={4} {...register("description")} />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={category}
            onValueChange={(v) => setValue("category", v as CreateFoundItemInput["category"])}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {ITEM_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>{formatLabel(cat)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateFound">Date Found</Label>
          <Input id="dateFound" type="date" {...register("dateFound")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" {...register("location")} placeholder="Where you found it" />
        {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL (optional)</Label>
        <Input id="imageUrl" {...register("imageUrl")} placeholder="https://..." />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting && <Spinner className="mr-2" />}
        Report Found Item
      </Button>
    </form>
  );
}
