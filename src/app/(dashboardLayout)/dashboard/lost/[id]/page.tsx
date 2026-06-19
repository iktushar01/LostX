import { notFound } from "next/navigation";
import { getLostItemByIdAction } from "@/actions/lostx/lost-item.actions";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { ItemDetailLayout } from "@/components/items/ItemDetailLayout";
import { DeleteLostItemButton } from "@/components/lost-items/DeleteLostItemButton";
import { FinderTipDialog } from "@/components/lost-items/FinderTipDialog";
import { SuggestedMatches } from "@/components/matches/SuggestedMatches";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LostItemDetailPage({ params }: Props) {
  const { id } = await params;
  const [itemResult, userResult] = await Promise.all([
    getLostItemByIdAction(id),
    getCurrentUserAction(),
  ]);

  if (!itemResult.success || !itemResult.data) notFound();

  const item = itemResult.data;
  const currentUserId = userResult.success ? userResult.data?.id : null;
  const isOwner = currentUserId === item.userId;
  const canReportFound =
    Boolean(currentUserId) &&
    !isOwner &&
    (item.status === "OPEN" || item.status === "MATCHED");

  return (
    <ItemDetailLayout
      type="lost"
      title={item.title}
      description={item.description}
      category={item.category}
      location={item.location}
      date={item.dateLost}
      dateLabel="Date lost"
      status={item.status}
      imageUrl={item.imageUrl}
      reporterName={item.user?.name}
      backHref="/dashboard/lost"
      primaryCta={
        canReportFound ? (
          <FinderTipDialog lostItemId={item.id} lostItemTitle={item.title} />
        ) : undefined
      }
      actions={
        isOwner ? (
          <>
            <Button variant="outline" asChild>
              <Link href={`/dashboard/lost/${item.id}/edit`}>Edit report</Link>
            </Button>
            <DeleteLostItemButton itemId={item.id} />
          </>
        ) : undefined
      }
      aside={
        item.suggestedMatches?.length ? (
          <SuggestedMatches matches={item.suggestedMatches} currentType="lost" />
        ) : undefined
      }
    />
  );
}
