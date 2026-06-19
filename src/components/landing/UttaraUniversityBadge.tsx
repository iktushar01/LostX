import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { UTTARA_UNIVERSITY } from "@/constants/university";

interface UttaraUniversityBadgeProps {
  className?: string;
  size?: "sm" | "md";
}

export function UttaraUniversityBadge({
  className,
  size = "md",
}: UttaraUniversityBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-emerald-600/25 bg-emerald-600/[0.06] text-emerald-800 dark:text-emerald-400",
        size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1 text-xs",
        className,
      )}
    >
      <GraduationCap
        className={cn(size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")}
        aria-hidden
      />
      <span>
        For <span className="font-semibold">{UTTARA_UNIVERSITY.name}</span> students
      </span>
    </div>
  );
}
