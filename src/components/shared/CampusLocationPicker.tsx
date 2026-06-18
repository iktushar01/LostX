"use client";

import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { CAMPUS_BUILDINGS } from "@/constants/campus";

interface CampusLocationPickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

export function CampusLocationPicker({
  value,
  onChange,
  error,
  label = "Location",
}: CampusLocationPickerProps) {
  const mapUrl = useMemo(() => {
    if (!value.trim()) return "";
    return `https://www.google.com/maps?q=${encodeURIComponent(value)}&output=embed`;
  }, [value]);

  const selectedBuilding = CAMPUS_BUILDINGS.includes(value as (typeof CAMPUS_BUILDINGS)[number])
    ? value
    : "custom";

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="grid gap-3 sm:grid-cols-[220px_1fr]">
        <Select
          value={selectedBuilding}
          onValueChange={(next) => {
            if (next === "custom") return;
            onChange(next);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pick building" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Custom location</SelectItem>
            {CAMPUS_BUILDINGS.map((building) => (
              <SelectItem key={building} value={building}>
                {building}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-9"
            placeholder="Building, floor, landmark"
          />
        </div>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {mapUrl ? (
        <div className="overflow-hidden rounded-xl border">
          <iframe
            title="Location map preview"
            src={mapUrl}
            className="h-56 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : null}
    </div>
  );
}

