"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  createLostItemSchema,
  CreateLostItemInput,
  defaultVisibilityForCategory,
} from "@/zod/lostx.validation";
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
      privateDescription: "",
      category: "OTHER",
      location: "",
      dateLost: new Date().toISOString().split("T")[0],
      ...defaultVisibilityForCategory("OTHER"),
    },
  });

  const category = watch("category");
  const location = watch("location");
  const showImagePublic = watch("showImagePublic");
  const showDescriptionPublic = watch("showDescriptionPublic");
  const showLocationPublic = watch("showLocationPublic");

  useEffect(() => {
    const defaults = defaultVisibilityForCategory(category);
    setValue("showImagePublic", defaults.showImagePublic);
    setValue("showDescriptionPublic", defaults.showDescriptionPublic);
    setValue("showLocationPublic", defaults.showLocationPublic);
  }, [category, setValue]);

  const handleImageChange = (file: File | null) => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = async (values: CreateLostItemInput) => {
    setSubmitting(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formData.append(key, String(value ?? "")),
    );
    if (imageFile) formData.append("image", imageFile);

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
      <div className="space-y-1">
        <h1 className="text-xl font-medium tracking-tight">Report missing item</h1>
        <p className="text-sm text-muted-foreground">
          Public summary for browse; private details are encrypted and used only for verification.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Item Title</Label>
          <Input id="title" {...register("title")} placeholder="e.g., Space Gray AirPods Pro" />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Public summary</Label>
          <Textarea
            id="description"
            rows={3}
            {...register("description")}
            placeholder="Short, non-identifying description for the browse feed..."
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="privateDescription">Private details (encrypted)</Label>
          <Textarea
            id="privateDescription"
            rows={4}
            {...register("privateDescription")}
            placeholder="Scratches, serial numbers, contents, stickers — only used for AI verification..."
          />
          {errors.privateDescription && (
            <p className="text-xs text-destructive">{errors.privateDescription.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={category}
              onValueChange={(v) => setValue("category", v as CreateLostItemInput["category"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ITEM_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {formatLabel(cat)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateLost">Date Lost</Label>
            <Input id="dateLost" type="date" {...register("dateLost")} />
          </div>
        </div>

        <CampusLocationPicker
          value={location}
          onChange={(v) => setValue("location", v, { shouldDirty: true, shouldValidate: true })}
          error={errors.location?.message}
          label="Last Known Location"
        />

        <div className="space-y-3 rounded-lg border border-dashed p-4">
          <p className="text-sm font-medium">Public visibility</p>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={showImagePublic}
              onCheckedChange={(v) => setValue("showImagePublic", v === true)}
            />
            Show photo on public browse
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={showDescriptionPublic}
              onCheckedChange={(v) => setValue("showDescriptionPublic", v === true)}
            />
            Show full public summary on browse
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={showLocationPublic}
              onCheckedChange={(v) => setValue("showLocationPublic", v === true)}
            />
            Show exact location on browse
          </label>
        </div>

        <div className="space-y-2">
          <Label>Photo Reference</Label>
          <ImageUploadField
            previewUrl={imagePreview}
            onFileChange={handleImageChange}
            onClear={() => handleImageChange(null)}
          />
        </div>
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? (
          <>
            <Spinner className="mr-2 h-4 w-4" /> Publishing...
          </>
        ) : (
          "Submit Report"
        )}
      </Button>
    </form>
  );
}
