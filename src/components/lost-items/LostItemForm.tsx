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
import { ShieldCheck, Sparkles } from "lucide-react";

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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-8 animate-in fade-in-50 duration-300">
      
      {/* Intro Header */}
      <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-5">
        <h2 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/20" /> Report Something Missing
        </h2>
        <p className="text-xs font-medium text-muted-foreground"> Fill out the details below to broadcast it to the feed and trigger AI auto-matching.</p>
      </div>

      {/* Main Fields Container */}
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Item Title</Label>
          <Input 
            id="title" 
            {...register("title")} 
            placeholder="What's missing? (e.g., Space Gray AirPods Pro)" 
            className="h-11 rounded-xl border-slate-200/80 bg-slate-50/35 focus-visible:ring-primary dark:border-slate-800 dark:bg-slate-900/20"
          />
          {errors.title && <p className="text-xs font-semibold text-destructive font-mono">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Detailed Description</Label>
          <Textarea 
            id="description" 
            rows={4} 
            {...register("description")} 
            placeholder="Mention distinct stickers, case scuffs, lock-screen wallpapers, or specific item traits..."
            className="rounded-xl border-slate-200/80 bg-slate-50/35 focus-visible:ring-primary dark:border-slate-800 dark:bg-slate-900/20 resize-none leading-relaxed"
          />
          {errors.description && (
            <p className="text-xs font-semibold text-destructive font-mono">{errors.description.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Category Tag</Label>
            <Select
              value={category}
              onValueChange={(v) => setValue("category", v as CreateLostItemInput["category"])}
            >
              <SelectTrigger className="h-11 rounded-xl border-slate-200/80 bg-slate-50/35 dark:border-slate-800 dark:bg-slate-900/20 focus:ring-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {ITEM_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="rounded-lg">{formatLabel(cat)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateLost" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Date Lost</Label>
            <Input 
              id="dateLost" 
              type="date" 
              {...register("dateLost")} 
              className="h-11 rounded-xl border-slate-200/80 bg-slate-50/35 focus-visible:ring-primary dark:border-slate-800 dark:bg-slate-900/20 font-mono"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10 p-1">
          <CampusLocationPicker
            value={location}
            onChange={(v) => setValue("location", v, { shouldDirty: true, shouldValidate: true })}
            error={errors.location?.message}
            label="Last Known Location"
          />
        </div>

        {/* Dynamic Verification Shield Box */}
        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/40 p-5 dark:border-slate-800/80 dark:bg-slate-900/30 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            <ShieldCheck className="h-4 w-4 text-primary" /> Ownership Verification Guard
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="verificationQuestion" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Custom Question</Label>
              <Input
                id="verificationQuestion"
                {...register("verificationQuestion")}
                placeholder='e.g., "What sticker is on the back?"'
                className="h-10 rounded-xl border-slate-200 bg-white focus-visible:ring-primary dark:border-slate-800 dark:bg-slate-950"
              />
              {errors.verificationQuestion && (
                <p className="text-xs font-semibold text-destructive font-mono">{errors.verificationQuestion.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationAnswer" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Secret Answer</Label>
              <Input
                id="verificationAnswer"
                type="password"
                autoComplete="off"
                {...register("verificationAnswer")}
                placeholder="Only the real owner would know"
                className="h-10 rounded-xl border-slate-200 bg-white focus-visible:ring-primary dark:border-slate-800 dark:bg-slate-950 font-mono"
              />
              {errors.verificationAnswer && (
                <p className="text-xs font-semibold text-destructive font-mono">{errors.verificationAnswer.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Media Block */}
        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Photo Reference</Label>
          <div className="overflow-hidden rounded-2xl border border-dashed border-slate-200/80 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10">
            <ImageUploadField
              previewUrl={imagePreview}
              onFileChange={handleImageChange}
              onClear={clearImage}
            />
          </div>
        </div>
      </div>

      {/* Modern High-Contrast CTA Trigger */}
      <Button 
        type="submit" 
        disabled={submitting}
        className="w-full h-12 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 active:scale-[0.98] shadow-sm bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
      >
        {submitting ? (
          <div className="flex items-center gap-2">
            <Spinner className="h-4 w-4 text-current" />
            <span>Publishing to feed...</span>
          </div>
        ) : (
          "Report Lost Item"
        )}
      </Button>
    </form>
  );
}