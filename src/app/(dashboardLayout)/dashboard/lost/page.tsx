import { PageHeader } from "@/components/shared/PageHeader";
import { LostItemList } from "@/components/lost-items/LostItemList";
import { getMyLostItemsAction } from "@/actions/lostx/lost-item.actions";

export default async function DashboardLostPage() {
  const result = await getMyLostItemsAction(24);

  return (
    <div className="p-6">
      <PageHeader
        title="My Lost Items"
        description="Your lost item reports."
        actionLabel="Report Lost Item"
        actionHref="/dashboard/lost/new"
      />
      <LostItemList items={result.data ?? []} />
    </div>
  );
}
