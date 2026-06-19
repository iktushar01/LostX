import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Report Lost", color: "bg-amber-500", glow: "shadow-amber-500/20" },
  { label: "Report Found", color: "bg-blue-500", glow: "shadow-blue-500/20" },
  { label: "Browse Items", color: "bg-emerald-500", glow: "shadow-emerald-500/20" },
  { label: "Submit Claim", color: "bg-violet-500", glow: "shadow-violet-500/20" },
  { label: "Admin Review", color: "bg-slate-400", glow: "shadow-slate-400/20" },
  { label: "Recovered", color: "bg-green-500", glow: "shadow-green-500/20" },
];

export function WorkflowGuide() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-md shadow-sm">
      {/* Structural Ambient Glow */}
      <div className="absolute -right-12 -top-12 -z-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
      
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
        How LostX Works
      </p>

      {/* Steps Scroll/Flex Track */}
      <div className="mt-5 flex flex-wrap items-center gap-y-4 gap-x-2.5">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2.5">
            {/* Step Element */}
            <div 
              className={cn(
                "group flex items-center gap-2 rounded-xl border border-border/80 bg-background/60 pl-2 pr-3.5 py-1.5 text-sm font-medium shadow-sm transition-all duration-300",
                "hover:border-border hover:bg-background hover:shadow-md",
                step.glow
              )}
            >
              {/* Step Counter Tag */}
              <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-muted text-[10px] font-bold text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                0{i + 1}
              </span>

              {/* Status Ping Marker */}
              <span className="relative flex h-2 w-2">
                <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-40", step.color)} />
                <span className={cn("relative inline-flex h-2 w-2 rounded-full shadow-sm", step.color)} />
              </span>

              <span className="text-foreground/90 tracking-tight transition-colors group-hover:text-foreground">
                {step.label}
              </span>
            </div>

            {/* Seamless Flow Arrow Separator */}
            {i < steps.length - 1 && (
              <div className="flex items-center text-muted-foreground/40 sm:mx-0.5">
                <ArrowRight className="h-4 w-4 stroke-[1.75]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}