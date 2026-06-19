"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HandHelping } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { CampusLocationPicker } from "@/components/shared/CampusLocationPicker";
import { submitFinderTipAction } from "@/actions/lostx/found-item.actions";

interface FinderTipDialogProps {
  lostItemId: string;
  lostItemTitle: string;
  size?: "default" | "lg";
}

export function FinderTipDialog({ lostItemId, lostItemTitle, size = "lg" }: FinderTipDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [dateFound, setDateFound] = useState(new Date().toISOString().split("T")[0]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!location.trim()) {
      toast.error("Where you found it is required.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    if (note.trim()) formData.append("note", note.trim());
    formData.append("location", location);
    formData.append("dateFound", dateFound);
    if (imageFile) formData.append("image", imageFile);

    const result = await submitFinderTipAction(lostItemId, formData);
    setSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("We've notified the owner. They can submit a claim for admin review.");
    setOpen(false);
    router.push(`/dashboard/found/${result.data?.id}`);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={size === "lg" ? "h-12 w-full gap-2 text-base font-semibold" : "gap-2"}
          size={size === "lg" ? "lg" : "default"}
        >
          <HandHelping className="h-5 w-5" />
          I may have found this
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[min(90vh,42rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="shrink-0 space-y-2 border-b px-4 pt-4 pb-3 pr-10">
          <DialogTitle>Report found: {lostItemTitle}</DialogTitle>
          <DialogDescription>
            Tell us where and when you found it. The owner will be notified to review and claim —
            your contact details stay private until admin approval.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="finder-note">Note (optional)</Label>
              <Textarea
                id="finder-note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Color, condition, where you picked it up..."
              />
            </div>

            <CampusLocationPicker
              value={location}
              onChange={setLocation}
              label="Where did you find it?"
            />

            <div className="space-y-2">
              <Label htmlFor="finder-date">Date found</Label>
              <Input
                id="finder-date"
                type="date"
                value={dateFound}
                onChange={(e) => setDateFound(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Photo (optional)</Label>
              <ImageUploadField
                previewUrl={imagePreview}
                onFileChange={handleImageChange}
                onClear={() => handleImageChange(null)}
              />
            </div>
          </div>

          <div className="shrink-0 border-t bg-popover px-4 py-4">
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Submitting...
                </>
              ) : (
                "Notify owner"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
