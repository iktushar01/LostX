import { Badge } from "@/components/ui/badge";
import { TrustTier } from "@/types/lostx.types";
import { cn } from "@/lib/utils";
import { Shield, ShieldAlert, ShieldCheck, Sparkles } from "lucide-react";

const tierConfig: Record<
  TrustTier,
  { label: string; className: string; icon: typeof Shield }
> = {
  NEW: {
    label: "New member",
    className: "bg-slate-500/15 text-slate-700 dark:text-slate-300",
    icon: Sparkles,
  },
  VERIFIED: {
    label: "Verified",
    className: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
    icon: Shield,
  },
  TRUSTED: {
    label: "Trusted",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    icon: ShieldCheck,
  },
  FLAGGED: {
    label: "Limited trust",
    className: "bg-amber-500/15 text-amber-800 dark:text-amber-300",
    icon: ShieldAlert,
  },
};

export function TrustBadge({ tier, score }: { tier: TrustTier; score?: number }) {
  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={cn("gap-1 border-0 font-medium", config.className)}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
      {score != null && <span className="opacity-70">· {score}</span>}
    </Badge>
  );
}
