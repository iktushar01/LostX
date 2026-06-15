import { ArrowRight } from "lucide-react";

const steps = [
  { label: "Report Lost", color: "bg-amber-500" },
  { label: "Report Found", color: "bg-blue-500" },
  { label: "Browse Items", color: "bg-emerald-500" },
  { label: "Submit Claim", color: "bg-violet-500" },
  { label: "Admin Review", color: "bg-slate-500" },
  { label: "Recovered", color: "bg-green-500" },
];

export function WorkflowGuide() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-900/30">
      <p className="text-sm font-medium text-muted-foreground">How LostX works</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium shadow-sm">
              <span className={`h-2 w-2 rounded-full ${step.color}`} />
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
