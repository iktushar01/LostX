import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, User, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryBadge, StatusBadge, TypeBadge } from "@/components/shared/ItemBadges";
import { Separator } from "@/components/ui/separator";

interface ItemDetailLayoutProps {
  type: "lost" | "found";
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  dateLabel: string;
  status: string;
  imageUrl?: string | null;
  reporterName?: string;
  backHref: string;
  actions?: React.ReactNode;
  primaryCta?: React.ReactNode;
}

export function ItemDetailLayout({
  type,
  title,
  description,
  category,
  location,
  date,
  dateLabel,
  status,
  imageUrl,
  reporterName,
  backHref,
  actions,
  primaryCta,
}: ItemDetailLayoutProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href={backHref}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
            {imageUrl ? (
              <div className="aspect-square w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center text-slate-300 dark:text-slate-700">
                <ImageIcon className="h-20 w-20" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={type} />
            <CategoryBadge category={category} />
            <StatusBadge status={status} />
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-4 whitespace-pre-wrap leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{location}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{dateLabel}</p>
                  <p className="font-medium">{new Date(date).toLocaleDateString()}</p>
                </div>
              </div>
              {reporterName && (
                <>
                  <Separator />
                  <div className="flex items-center gap-3 text-sm">
                    <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Reported by</p>
                      <p className="font-medium">{reporterName}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {primaryCta && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-900/50 dark:bg-blue-950/20">
              <p className="mb-3 text-sm font-medium text-blue-700 dark:text-blue-400">
                Think this item is yours?
              </p>
              {primaryCta}
            </div>
          )}

          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
