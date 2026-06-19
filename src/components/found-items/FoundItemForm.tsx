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
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { CampusLocationPicker } from "@/components/shared/CampusLocationPicker";
import { createFoundItemAction } from "@/actions/lostx/found-item.actions";

export function FoundItemForm() {
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
  } = useForm<CreateFoundItemInput>({
    resolver: zodResolver(createFoundItemSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "OTHER",
      location: "",
      dateFound: new Date().toISOString().split("T")[0],
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

  const onSubmit = async (values: CreateFoundItemInput) => {
    setSubmitting(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, String(value ?? "")));
    if (imageFile) {
      formData.append("image", imageFile);
    }

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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-8 py-6">
      <div className="space-y-1">
        <h1 className="text-xl font-medium tracking-tight">Report found item</h1>
        <p className="text-sm text-muted-foreground">
          List what you found on campus so the owner can browse, match, and claim it safely.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Item Title
          </Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="e.g., Black Samsung phone"
            className="h-10 rounded-lg"
          />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            rows={4}
            {...register("description")}
            placeholder="Describe color, brand, condition, and anything that helps identify it..."
            className="resize-none rounded-lg leading-relaxed"
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <Select
              value={category}
              onValueChange={(v) => setValue("category", v as CreateFoundItemInput["category"])}
            >
              <SelectTrigger className="h-10 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {ITEM_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="rounded-md">
                    {formatLabel(cat)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateFound" className="text-sm font-medium">
              Date Found
            </Label>
            <Input id="dateFound" type="date" {...register("dateFound")} className="h-10 rounded-lg" />
            {errors.dateFound && (
              <p className="text-xs text-destructive">{errors.dateFound.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Location Found</Label>
          <CampusLocationPicker
            value={location}
            onChange={(v) => setValue("location", v, { shouldDirty: true, shouldValidate: true })}
            error={errors.location?.message}
            label=""
          />
        </div>

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

      <Button
        type="submit"
        disabled={submitting}
        className="h-11 w-full rounded-lg text-sm font-medium shadow-none transition-all"
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
