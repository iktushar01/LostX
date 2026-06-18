"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { FoundItemDetail, ITEM_CATEGORIES } from "@/types/lostx.types";
import { formatLabel } from "@/components/shared/ItemBadges";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { CampusLocationPicker } from "@/components/shared/CampusLocationPicker";
import { updateFoundItemAction } from "@/actions/lostx/found-item.actions";

interface EditFoundItemFormProps {
  item: FoundItemDetail;
}

export function EditFoundItemForm({ item }: EditFoundItemFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(item.imageUrl ?? null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateFoundItemInput>({
    resolver: zodResolver(createFoundItemSchema),
    defaultValues: {
      title: item.title,
      description: item.description,
      category: item.category,
      location: item.location,
      dateFound: new Date(item.dateFound).toISOString().split("T")[0],
    },
  });

  const category = watch("category");
  const location = watch("location");

  const handleImageChange = (file: File | null) => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : item.imageUrl ?? null);
  };

  const clearImage = () => {
    handleImageChange(null);
    setImagePreview(null);
  };

  const onSubmit = async (values: CreateFoundItemInput) => {
    setSubmitting(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, String(value ?? "")));
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (!imagePreview) {
      formData.append("imageUrl", "");
    }

    const result = await updateFoundItemAction(item.id, formData);
    setSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Found item updated");
    router.push(`/dashboard/found/${item.id}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={4} {...register("description")} />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
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

      <CampusLocationPicker
        value={location}
        onChange={(v) => setValue("location", v, { shouldDirty: true, shouldValidate: true })}
        error={errors.location?.message}
        label="Location"
      />

      <ImageUploadField
        previewUrl={imagePreview}
        onFileChange={handleImageChange}
        onClear={clearImage}
      />

      <Button type="submit" disabled={submitting}>
        {submitting && <Spinner className="mr-2" />}
        Save Changes
      </Button>
    </form>
  );
}

