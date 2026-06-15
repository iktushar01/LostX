import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {action}
          {viewAllHref && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={viewAllHref}>
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
