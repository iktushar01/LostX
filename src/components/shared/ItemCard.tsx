import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, ImageIcon, Star, ArrowUpRight } from "lucide-react";
import { CategoryBadge, StatusBadge, TypeBadge } from "./ItemBadges";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  id: string;
  type: "lost" | "found";
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: string;
  imageUrl?: string | null;
  isFeatured?: boolean;
  href?: string;
  showAction?: boolean;
  reporterUserId?: string;
  reporterName?: string;
  reporterImage?: string | null;
  showReporter?: boolean;
}

export function ItemCard({
  id,
  type,
  title,
  description,
  category,
  location,
  date,
  status,
  imageUrl,
  isFeatured = false,
  href,
  showAction = true,
  reporterUserId,
  reporterName,
  reporterImage,
  showReporter = false,
}: ItemCardProps) {
  const link = href ?? (type === "lost" ? `/dashboard/lost/${id}` : `/dashboard/found/${id}`);
  const reporterInitials =
    reporterName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "?";

  return (
    <Card
      className={cn(
        "group h-full overflow-hidden rounded-3xl border-slate-200/80 shadow-sm transition-all duration-300 ease-out",
        "hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:hover:border-slate-700",
      )}
    >
      <Link href={link} className="relative block">
        {/* Image / Thumbnail Wrapper */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
          {imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300 dark:text-slate-700">
              <ImageIcon className="h-10 w-10 stroke-[1.5]" />
            </div>
          )}
          
          {/* Badge placements over image */}
          <div className="absolute left-3 top-3 z-10">
            <TypeBadge type={type} />
          </div>
          
          {isFeatured && (
            <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </div>
          )}

          {/* Dark overlay on hover for better immersion */}
          <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-black/10" />
        </div>
      </Link>

      <CardContent className="space-y-4 p-5">
        {/* Dynamic status badges wrapper */}
        <div className="flex flex-wrap gap-1.5">
          <CategoryBadge category={category} />
          <StatusBadge status={status} />
        </div>

        {/* Title + Micro arrow interaction */}
        <div className="space-y-1">
          <Link href={link} className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-base font-bold tracking-tight transition-colors group-hover:text-primary">
              {title}
            </h3>
            {/* Smooth scaling arrow circle indicator */}
            <div className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all duration-300 group-hover:bg-primary group-hover:text-white dark:bg-slate-800 dark:text-slate-500 group-hover:rotate-45">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground/90 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Info Rows */}
        <div className="space-y-2 border-t border-slate-100 pt-4 text-xs font-medium text-muted-foreground dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="line-clamp-1 font-mono">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="font-mono">{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>

        {showReporter && reporterUserId && reporterName && (
          <Link
            href={`/users/${reporterUserId}`}
            className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <Avatar className="h-8 w-8 shrink-0 ring-2 ring-background">
              <AvatarImage src={reporterImage ?? undefined} alt={reporterName} />
              <AvatarFallback className="text-[10px] font-semibold">{reporterInitials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Reported by
              </p>
              <p className="truncate text-sm font-semibold text-foreground">{reporterName}</p>
            </div>
          </Link>
        )}
      </CardContent>

      {showAction && (
        <CardFooter className="p-5 pt-0">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full rounded-xl bg-slate-50 font-semibold text-primary transition-all duration-200 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900" 
            asChild
          >
            <Link href={link}>View Details</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}