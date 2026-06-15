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
import { createLostItemSchema, CreateLostItemInput } from "@/zod/lostx.validation";
import { ITEM_CATEGORIES } from "@/types/lostx.types";
import { formatLabel } from "@/components/shared/ItemBadges";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { createLostItemAction } from "@/actions/lostx/lost-item.actions";

export function LostItemForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateLostItemInput>({
    resolver: zodResolver(createLostItemSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "OTHER",
      location: "",
      dateLost: new Date().toISOString().split("T")[0],
      verificationQuestion: "",
      verificationAnswer: "",
    },
  });

  const category = watch("category");

  const handleImageChange = (file: File | null) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const clearImage = () => {
    handleImageChange(null);
  };

  const onSubmit = async (values: CreateLostItemInput) => {
    setSubmitting(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, String(value ?? "")));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const result = await createLostItemAction(formData);
    setSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Lost item reported!");
    router.push(`/dashboard/lost/${result.data?.id}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} placeholder="e.g. Black wallet" />
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
            onValueChange={(v) => setValue("category", v as CreateLostItemInput["category"])}
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
          <Label htmlFor="dateLost">Date Lost</Label>
          <Input id="dateLost" type="date" {...register("dateLost")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" {...register("location")} placeholder="Campus building or area" />
        {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="verificationQuestion">Verification Question</Label>
        <Input
          id="verificationQuestion"
          {...register("verificationQuestion")}
          placeholder='e.g. "What is inside the wallet?"'
        />
        {errors.verificationQuestion && (
          <p className="text-sm text-destructive">{errors.verificationQuestion.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="verificationAnswer">Verification Answer</Label>
        <Input
          id="verificationAnswer"
          type="password"
          autoComplete="off"
          {...register("verificationAnswer")}
          placeholder="Answer only you would know (stored securely)"
        />
        {errors.verificationAnswer && (
          <p className="text-sm text-destructive">{errors.verificationAnswer.message}</p>
        )}
      </div>

      <ImageUploadField
        previewUrl={imagePreview}
        onFileChange={handleImageChange}
        onClear={clearImage}
      />

      <Button type="submit" disabled={submitting}>
        {submitting && <Spinner className="mr-2" />}
        Report Lost Item
      </Button>
    </form>
  );
}
