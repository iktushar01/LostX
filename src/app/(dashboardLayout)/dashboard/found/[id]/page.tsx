import { notFound } from "next/navigation";
import { getFoundItemByIdAction } from "@/actions/lostx/found-item.actions";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { ItemDetailLayout } from "@/components/items/ItemDetailLayout";
import { DeleteFoundItemButton } from "@/components/found-items/DeleteFoundItemButton";
import { ClaimItemDialog } from "@/components/found-items/ClaimItemDialog";

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
      actions={isOwner ? <DeleteFoundItemButton itemId={item.id} /> : undefined}
    />
  );
}
