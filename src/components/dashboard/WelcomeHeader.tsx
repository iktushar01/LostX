import { Sparkles } from "lucide-react";

interface WelcomeHeaderProps {
  name: string;
}

export function WelcomeHeader({ name }: WelcomeHeaderProps) {
  const firstName = name.split(" ")[0] ?? name;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8 backdrop-blur-md shadow-sm">
      {/* Premium Mesh Glow Effects */}
      <div className="absolute -left-16 -top-16 -z-10 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />
      <div className="absolute -right-16 -bottom-16 -z-10 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/5" />

      {/* Top Tagline */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/10 bg-blue-500/5 px-2.5 py-1 text-xs font-medium text-blue-600 dark:border-blue-400/10 dark:bg-blue-400/5 dark:text-blue-400">
        <Sparkles className="h-3 w-3 animate-pulse" />
        <span>Welcome back</span>
      </div>

      {/* Main Heading with Gradient Text */}
      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl text-foreground">
        Hey,{" "}
        <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
          {firstName}
        </span>{" "}
        <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite] origin-[70%_70%]">
          👋
        </span>
      </h1>

      {/* Description */}
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Track your lost items and recover them faster. Report, browse, claim — we&apos;ll guide you
        through every step of the way.
      </p>
    </div>
  );
}