import Link from "next/link";
import { Plus, Search, HandHelping, PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    href: "/dashboard/lost/new",
    label: "Report Lost Item",
    description: "Lost something? Create a report with verification details.",
    icon: Plus,
    accent: "from-amber-500/10 to-orange-500/5 border-amber-200/60 dark:border-amber-900/40",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    href: "/dashboard/found/new",
    label: "Report Found Item",
    description: "Found something? Help someone get it back.",
    icon: PackageSearch,
    accent: "from-blue-500/10 to-cyan-500/5 border-blue-200/60 dark:border-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    href: "/browse",
    label: "Browse Items",
    description: "Search all lost & found reports on campus.",
    icon: Search,
    accent: "from-emerald-500/10 to-green-500/5 border-emerald-200/60 dark:border-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    href: "/claims",
    label: "View Claims",
    description: "Track ownership claims and recovery progress.",
    icon: HandHelping,
    accent: "from-violet-500/10 to-purple-500/5 border-violet-200/60 dark:border-violet-900/40",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
];

export function QuickActionCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className={cn(
            "group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all duration-200",
            "hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50",
            action.accent,
          )}
        >
          <div
            className={cn(
              "mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 shadow-sm",
              action.iconColor,
            )}
          >
            <action.icon className="h-5 w-5" />
          </div>
          <p className="font-semibold tracking-tight">{action.label}</p>
          <p className="mt-1.5 text-sm text-muted-foreground">{action.description}</p>
          <span className="mt-4 inline-flex text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Get started →
          </span>
        </Link>
      ))}
    </div>
  );
}
