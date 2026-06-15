import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { BrowseItem } from "@/types/lostx.types";
import { CategoryBadge, StatusBadge, TypeBadge } from "@/components/shared/ItemBadges";

interface BrowseItemCardProps {
  item: BrowseItem;
}

export function BrowseItemCard({ item }: BrowseItemCardProps) {
  const date = item.itemType === "lost" ? item.dateLost : item.dateFound;
  const href =
    item.itemType === "lost"
      ? `/dashboard/lost/${item.id}`
      : `/dashboard/found/${item.id}`;

  return (
    <Link href={href}>
      <Card className="h-full transition-shadow hover:shadow-md">
        {item.imageUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-t-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
          </div>
        )}
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <TypeBadge type={item.itemType} />
            <CategoryBadge category={item.category} />
            <StatusBadge status={item.status} />
          </div>
          <CardTitle className="line-clamp-1 text-lg">{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">{item.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-sm font-medium text-primary">View details →</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
