import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  action?: React.ReactNode;
  viewAllHref?: string;
}

export function DashboardSection({
  title,
  description,
  icon: Icon,
  children,
  action,
  viewAllHref,
}: DashboardSectionProps) {
  return (
    <section className="space-y-5">
      {/* Section Header Wrapper */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Left Side: Icon, Title & Subtitle */}
        <div className="flex items-start gap-3.5">
          {/* Minimal Modern Icon Frame */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-muted/40 text-foreground shadow-sm">
            <Icon className="h-5 w-5 stroke-[2]" />
          </div>
          
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Right Side: Action CTA Slots */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          {action}
          {viewAllHref && (
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="group h-9 rounded-xl px-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <Link href={viewAllHref}>
                <span className="text-sm font-medium">View all</span>
                <ArrowRight className="ml-1.5 h-4 w-4 stroke-[2.25] transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="rounded-2xl border border-border/60 bg-card/30 p-5 sm:p-6 backdrop-blur-sm shadow-sm">
        {children}
      </div>
    </section>
  );
}