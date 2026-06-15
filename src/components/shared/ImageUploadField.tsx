"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ImageUploadFieldProps {
  label?: string;
  previewUrl: string | null;
  onFileChange: (file: File | null) => void;
  onClear: () => void;
}

export function ImageUploadField({
  label = "Photo (optional)",
  previewUrl,
  onFileChange,
  onClear,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onFileChange(file);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted/50 transition-colors hover:bg-muted"
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Upload preview"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <Camera className="h-6 w-6 text-muted-foreground/70" />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera className="h-5 w-5 text-white" />
          </div>
        </button>

        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? "Change photo" : "Upload photo"}
          </Button>
          {previewUrl && (
            <Button type="button" variant="ghost" size="sm" onClick={onClear}>
              <X className="mr-1 h-4 w-4" />
              Remove
            </Button>
          )}
          <p className="text-xs text-muted-foreground">JPG, PNG, or WEBP up to 10MB</p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
