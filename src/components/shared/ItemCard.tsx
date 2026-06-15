import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { CategoryBadge, StatusBadge, TypeBadge } from "./ItemBadges";

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
}: ItemCardProps) {
  const link = href ?? (type === "lost" ? `/dashboard/lost/${id}` : `/dashboard/found/${id}`);

  return (
    <Link href={link}>
      <Card className="h-full transition-shadow hover:shadow-md">
        {imageUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-t-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
          </div>
        )}
        <CardHeader className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <TypeBadge type={type} />
            <CategoryBadge category={category} />
            <StatusBadge status={status} />
          </div>
          <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
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
        <CardFooter>
          <span className="text-sm font-medium text-primary">View details →</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
