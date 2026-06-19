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
import { CampusLocationPicker } from "@/components/shared/CampusLocationPicker";
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
  const location = watch("location");

  const handleImageChange = (file: File | null) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const clearImage = () => handleImageChange(null);

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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-8 py-6">
      {/* Clean, Editorial Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-medium tracking-tight">Report missing item</h1>
        <p className="text-sm text-muted-foreground">
          Provide details below to list it on the feed and start auto-matching.
        </p>
      </div>

      <div className="space-y-6">
        {/* Item Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">Item Title</Label>
          <Input 
            id="title" 
            {...register("title")} 
            placeholder="e.g., Space Gray AirPods Pro" 
            className="h-10 rounded-lg"
          />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">Description</Label>
          <Textarea 
            id="description" 
            rows={4} 
            {...register("description")} 
            placeholder="Mention distinct stickers, scuffs, or specific identifying traits..."
            className="rounded-lg resize-none leading-relaxed"
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
        </div>

        {/* Category & Date Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <Select
              value={category}
              onValueChange={(v) => setValue("category", v as CreateLostItemInput["category"])}
            >
              <SelectTrigger className="h-10 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {ITEM_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="rounded-md">{formatLabel(cat)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateLost" className="text-sm font-medium">Date Lost</Label>
            <Input 
              id="dateLost" 
              type="date" 
              {...register("dateLost")} 
              className="h-10 rounded-lg"
            />
          </div>
        </div>

        {/* Location Picker */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Last Known Location</Label>
          <CampusLocationPicker
            value={location}
            onChange={(v) => setValue("location", v, { shouldDirty: true, shouldValidate: true })}
            error={errors.location?.message}
            label="" // Clear inside label if component allows, let form control handle it
          />
        </div>

        {/* Clean Verification Section (No heavy card container) */}
        <div className="pt-4 border-t border-border space-y-4">
          <div>
            <h3 className="text-sm font-medium">Ownership Verification</h3>
            <p className="text-xs text-muted-foreground">Set a question only the true owner can answer.</p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="verificationQuestion" className="text-xs text-muted-foreground">Custom Question</Label>
              <Input
                id="verificationQuestion"
                {...register("verificationQuestion")}
                placeholder='e.g., "What sticker is on the back?"'
                className="h-10 rounded-lg"
              />
              {errors.verificationQuestion && <p className="text-xs text-destructive">{errors.verificationQuestion.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationAnswer" className="text-xs text-muted-foreground">Secret Answer</Label>
              <Input
                id="verificationAnswer"
                type="password"
                autoComplete="off"
                {...register("verificationAnswer")}
                placeholder="Answer"
                className="h-10 rounded-lg"
              />
              {errors.verificationAnswer && <p className="text-xs text-destructive">{errors.verificationAnswer.message}</p>}
            </div>
          </div>
        </div>

        {/* Photo Reference */}
        <div className="space-y-2 pt-2">
          <Label className="text-sm font-medium">Photo Reference</Label>
          <div className="overflow-hidden rounded-lg border border-dashed border-border bg-muted/20">
            <ImageUploadField
              previewUrl={imagePreview}
              onFileChange={handleImageChange}
              onClear={clearImage}
            />
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <Button 
        type="submit" 
        disabled={submitting}
        className="w-full h-11 rounded-lg text-sm font-medium transition-all shadow-none"
      >
        {submitting ? (
          <div className="flex items-center gap-2">
            <Spinner className="h-4 w-4 text-current" />
            <span>Publishing...</span>
          </div>
        ) : (
          "Submit Report"
        )}
      </Button>
    </form>
  );
}