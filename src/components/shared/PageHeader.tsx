import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
 
  actionLabel,
  actionHref,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", className)}>
      {children}
      {actionLabel && actionHref && !children && (
        <Button asChild className="shrink-0 shadow-sm">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
