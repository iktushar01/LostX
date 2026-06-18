import { notFound } from "next/navigation";
import { getFoundItemByIdAction } from "@/actions/lostx/found-item.actions";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { ItemDetailLayout } from "@/components/items/ItemDetailLayout";
import { DeleteFoundItemButton } from "@/components/found-items/DeleteFoundItemButton";
import { ClaimItemDialog } from "@/components/found-items/ClaimItemDialog";
import { MarkReturnedButton } from "@/components/found-items/MarkReturnedButton";
import { SuggestedMatches } from "@/components/matches/SuggestedMatches";
import Link from "next/link";
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
  const userRole = userResult.success ? userResult.data?.role : null;
  const isOwner = currentUserId === item.userId;
  const isAdmin = userRole === "ADMIN" || userRole === "SUPER_ADMIN";
  const canClaim = item.status === "AVAILABLE" && !isOwner;
  const canMarkReturned = item.status === "CLAIMED" && (isOwner || isAdmin);
  const canEdit = isOwner && (item.claims?.length ?? 0) === 0;
  const approvedClaim = item.claims?.find((claim) => claim.status === "APPROVED");

  return (
    <ItemDetailLayout
      type="found"
      title={item.title}
      description={item.description}
      category={item.category}
      location={item.location}
      date={item.dateFound}
      dateLabel="Date found"
      status={item.status}
      imageUrl={item.imageUrl}
      reporterName={item.user?.name}
      backHref="/dashboard/found"
      primaryCta={canClaim ? <ClaimItemDialog foundItemId={item.id} itemTitle={item.title} size="lg" /> : undefined}
      actions={
        <>
          {canEdit && (
            <Button variant="outline" asChild>
              <Link href={`/dashboard/found/${item.id}/edit`}>Edit report</Link>
            </Button>
          )}
          {isOwner && approvedClaim ? (
            <Button variant="secondary" asChild>
              <Link href={`/claims/${approvedClaim.id}`}>Open handoff chat</Link>
            </Button>
          ) : null}
          {canMarkReturned && <MarkReturnedButton itemId={item.id} />}
          {isOwner && <DeleteFoundItemButton itemId={item.id} />}
        </>
      }
      aside={
        item.suggestedMatches?.length ? (
          <SuggestedMatches matches={item.suggestedMatches} currentType="found" />
        ) : undefined
      }
    />
  );
}
