interface WelcomeHeaderProps {
  name: string;
}

export function WelcomeHeader({ name }: WelcomeHeaderProps) {
  const firstName = name.split(" ")[0] ?? name;

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 via-background to-background p-6 dark:border-slate-800 dark:from-blue-950/20">
      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Welcome back</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        {firstName} 👋
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
        Track your lost items and recover them faster. Report, browse, claim — we&apos;ll guide you
        through every step.
      </p>
    </div>
  );
}
