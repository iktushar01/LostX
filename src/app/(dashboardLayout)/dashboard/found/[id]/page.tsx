import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, User } from "lucide-react";
import { getFoundItemByIdAction } from "@/actions/lostx/found-item.actions";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { CategoryBadge, StatusBadge } from "@/components/shared/ItemBadges";
import { DeleteFoundItemButton } from "@/components/found-items/DeleteFoundItemButton";
import { ClaimItemDialog } from "@/components/found-items/ClaimItemDialog";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function FoundItemDetailPage({ params }: Props) {
  const { id } = await params;
  const [itemResult, userResult] = await Promise.all([
    getFoundItemByIdAction(id),
    getCurrentUserAction(),
  ]);

  if (!itemResult.success || !itemResult.data) notFound();

  const item = itemResult.data;
  const currentUserId = userResult.success ? userResult.data?.id : null;
  const isOwner = currentUserId === item.userId;
  const canClaim = item.status === "AVAILABLE" && !isOwner;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/dashboard/found">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      {item.imageUrl && (
        <div className="mb-6 aspect-video overflow-hidden rounded-xl border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <CategoryBadge category={item.category} />
          <StatusBadge status={item.status} />
        </div>
        <div className="flex gap-2">
          {canClaim && <ClaimItemDialog foundItemId={item.id} itemTitle={item.title} />}
          {isOwner && <DeleteFoundItemButton itemId={item.id} />}
        </div>
      </div>

      <h1 className="text-3xl font-bold">{item.title}</h1>
      <p className="mt-4 whitespace-pre-wrap text-muted-foreground">{item.description}</p>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {item.location}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          Found on {new Date(item.dateFound).toLocaleDateString()}
        </div>
        {item.user && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Reported by {item.user.name}
          </div>
        )}
      </div>
    </div>
  );
}
