import Link from "next/link";
import { Plus, Search, HandHelping, PackageSearch, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    href: "/dashboard/lost/new",
    label: "Report Lost Item",
    description: "Lost something? Create a report with verification details.",
    icon: Plus,
    accent: "hover:border-amber-500/50 dark:hover:border-amber-400/30",
    glow: "bg-amber-500/10",
    iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
  },
  {
    href: "/dashboard/found/new",
    label: "Report Found Item",
    description: "Found something? Help someone get it back.",
    icon: PackageSearch,
    accent: "hover:border-blue-500/50 dark:hover:border-blue-400/30",
    glow: "bg-blue-500/10",
    iconBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
  },
  {
    href: "/browse",
    label: "Browse Items",
    description: "Search all lost & found reports on campus.",
    icon: Search,
    accent: "hover:border-emerald-500/50 dark:hover:border-emerald-400/30",
    glow: "bg-emerald-500/10",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
  },
  {
    href: "/claims",
    label: "View Claims",
    description: "Track ownership claims and recovery progress.",
    icon: HandHelping,
    accent: "hover:border-violet-500/50 dark:hover:border-violet-400/30",
    glow: "bg-violet-500/10",
    iconBg: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400",
  },
];

export function QuickActionCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className={cn(
            "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 ease-out",
            "hover:-translate-y-1 hover:bg-card hover:shadow-xl hover:shadow-shadow/5",
            action.accent
          )}
        >
          {/* Ambient Hover Glow */}
          <div className={cn("absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", action.glow)} />

          <div>
            {/* Icon Wrapper */}
            <div
              className={cn(
                "mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-transparent shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                action.iconBg
              )}
            >
              <action.icon className="h-5 w-5 stroke-[2.25]" />
            </div>

            {/* Content */}
            <h3 className="font-semibold text-foreground tracking-tight text-base group-hover:text-primary transition-colors">
              {action.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground/90">
              {action.description}
            </p>
          </div>

          {/* Call to Action Footer */}
          <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
            <span>Get started</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  );
}