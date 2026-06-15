import { PageHeader } from "@/components/shared/PageHeader";
import { FoundItemList } from "@/components/found-items/FoundItemList";
import { getMyFoundItemsAction } from "@/actions/lostx/found-item.actions";

export default async function DashboardFoundPage() {
  const result = await getMyFoundItemsAction(24);

  return (
    <div className="p-6">
      <PageHeader
        title="My Found Items"
        description="Items you have reported as found."
        actionLabel="Report Found Item"
        actionHref="/dashboard/found/new"
      />
      <FoundItemList items={result.data ?? []} />
    </div>
  );
}
