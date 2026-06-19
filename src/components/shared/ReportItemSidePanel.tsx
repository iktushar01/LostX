import { ClipboardList, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const lostTips = [
  {
    icon: MapPin,
    title: "Pick the right building",
    description: "Choose where you last had the item — Central Library, Cafeteria, and other campus locations.",
  },
  {
    icon: ShieldCheck,
    title: "Set a verification question",
    description: "Only you should know the answer. This protects your item when someone tries to claim it.",
  },
  {
    icon: Sparkles,
    title: "Get match suggestions",
    description: "LostX compares your report with found items and highlights likely matches automatically.",
  },
];

const foundTips = [
  {
    icon: ClipboardList,
    title: "Describe it clearly",
    description: "Add color, brand, and unique marks so the owner can recognize their item from the listing.",
  },
  {
    icon: MapPin,
    title: "Where you found it",
    description: "Select the campus building or area where the item was picked up.",
  },
  {
    icon: ShieldCheck,
    title: "Safe handoff later",
    description: "Owners claim through verification and admin review before you arrange return.",
  },
];

interface ReportItemSidePanelProps {
  variant: "lost" | "found";
  className?: string;
}

export function ReportItemSidePanel({ variant, className }: ReportItemSidePanelProps) {
  const tips = variant === "lost" ? lostTips : foundTips;
  const heading = variant === "lost" ? "Tips for lost reports" : "Tips for found reports";

  return (
    <aside
      className={cn(
        "hidden rounded-2xl border border-border/60 bg-muted/30 p-6 md:block lg:sticky lg:top-20 lg:self-start",
        className,
      )}
    >
      <h2 className="text-sm font-semibold tracking-tight">{heading}</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        {variant === "lost"
          ? "Help others recognize your item and return it safely."
          : "Help the owner find what you picked up on campus."}
      </p>

      <ul className="mt-6 space-y-5">
        {tips.map((tip) => (
          <li key={tip.title} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground">
              <tip.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">{tip.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{tip.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
