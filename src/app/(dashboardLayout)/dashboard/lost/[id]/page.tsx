import { notFound } from "next/navigation";
import { getLostItemByIdAction } from "@/actions/lostx/lost-item.actions";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { ItemDetailLayout } from "@/components/items/ItemDetailLayout";
import { DeleteLostItemButton } from "@/components/lost-items/DeleteLostItemButton";

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
      actions={isOwner ? <DeleteLostItemButton itemId={item.id} /> : undefined}
    />
  );
}
