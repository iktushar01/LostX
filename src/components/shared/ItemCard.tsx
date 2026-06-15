import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ImageIcon } from "lucide-react";
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
  href?: string;
  showAction?: boolean;
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
  href,
  showAction = true,
}: ItemCardProps) {
  const link = href ?? (type === "lost" ? `/dashboard/lost/${id}` : `/dashboard/found/${id}`);

  return (
    <Card
      className={cn(
        "group h-full overflow-hidden border-slate-200/80 shadow-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:hover:border-slate-700",
      )}
    >
      <Link href={link} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
          {imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300 dark:text-slate-700">
              <ImageIcon className="h-12 w-12" />
            </div>
          )}
          <div className="absolute left-3 top-3">
            <TypeBadge type={type} />
          </div>
        </div>
      </Link>

      <CardContent className="space-y-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          <CategoryBadge category={category} />
          <StatusBadge status={status} />
        </div>
        <Link href={link}>
          <h3 className="line-clamp-1 text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
            {title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
        <div className="space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      {showAction && (
        <CardFooter className="border-t border-slate-100 p-4 pt-0 dark:border-slate-800">
          <Button variant="ghost" size="sm" className="w-full text-primary" asChild>
            <Link href={link}>View Details</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
