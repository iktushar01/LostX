import { PageHeader } from "@/components/shared/PageHeader";
import { LostItemList } from "@/components/lost-items/LostItemList";
import { getLostItemsAction } from "@/actions/lostx/lost-item.actions";

export default async function DashboardLostPage() {
  const result = await getLostItemsAction({ limit: 24 });

  return (
    <div className="p-6">
      <PageHeader
        title="Lost Items"
        description="All lost item reports on campus."
        actionLabel="Report Lost Item"
        actionHref="/dashboard/lost/new"
      />
      <LostItemList items={result.data ?? []} />
    </div>
  );
}
