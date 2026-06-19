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
  aside?: React.ReactNode;
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
  aside,
}: ItemDetailLayoutProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-in fade-in-50 duration-300">
      {/* Sleek navigation link */}
      <div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 group" 
          asChild
        >
          <Link href={backHref}>
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to browse
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_1.1fr] lg:items-start">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:border-slate-800 dark:bg-slate-900/50">
            {imageUrl ? (
              <div className="aspect-square w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center text-slate-300 dark:text-slate-700">
                <ImageIcon className="h-16 w-16 stroke-[1.25]" />
              </div>
            )}
          </div>
        </div>

        {/* Core Content Info Panel */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-1.5">
            <TypeBadge type={type} />
            <CategoryBadge category={category} />
            <StatusBadge status={status} />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              {title}
            </h1>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-muted-foreground/90 font-normal">
              {description}
            </p>
          </div>

          {/* Bento Meta Details Information Card */}
          <Card className="rounded-[24px] border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:border-slate-800">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Location discovered</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 font-mono mt-0.5">{location}</p>
                </div>
              </div>
              
              <Separator className="bg-slate-100 dark:bg-slate-800" />
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{dateLabel}</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 font-mono mt-0.5">{new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>

              {reporterName && (
                <>
                  <Separator className="bg-slate-100 dark:bg-slate-800" />
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Reported by</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{reporterName}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Primary Action Callout Module */}
          {primaryCta && (
            <div className="rounded-[24px] border border-blue-200 bg-blue-50/50 p-6 dark:border-blue-900/50 dark:bg-blue-950/20 shadow-sm">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
                Think this item is yours?
              </p>
              {primaryCta}
            </div>
          )}

          {/* Management / Action Triggers row */}
          {actions && <div className="flex flex-wrap gap-2.5 pt-2">{actions}</div>}
        </div>
      </div>

      {aside && <div className="pt-2">{aside}</div>}
    </div>
  );
}