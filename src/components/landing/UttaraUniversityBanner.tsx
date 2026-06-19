import { UTTARA_UNIVERSITY } from "@/constants/university";

export function UttaraUniversityBanner() {
  return (
    <div className="border-b border-emerald-600/15 bg-emerald-600/[0.04]">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-xs text-muted-foreground sm:text-sm">
        <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 sm:inline-block" />
        <p>
          <span className="font-medium text-foreground">LostX</span>
          {" · "}
          {UTTARA_UNIVERSITY.tagline}
        </p>
      </div>
    </div>
  );
}
