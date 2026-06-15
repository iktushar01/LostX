import { PageHeader } from "@/components/shared/PageHeader";
import { FoundItemList } from "@/components/found-items/FoundItemList";
import { getFoundItemsAction } from "@/actions/lostx/found-item.actions";

export default async function DashboardFoundPage() {
  const result = await getFoundItemsAction({ limit: 24 });

  return (
    <div className="p-6">
      <PageHeader
        title="Found Items"
        description="Items found on campus waiting to be claimed."
        actionLabel="Report Found Item"
        actionHref="/dashboard/found/new"
      />
      <FoundItemList items={result.data ?? []} />
    </div>
  );
}
