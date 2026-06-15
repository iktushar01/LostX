import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FoundItemList } from "@/components/found-items/FoundItemList";
import { getMyFoundItemsAction } from "@/actions/lostx/found-item.actions";
import { Button } from "@/components/ui/button";

export default async function DashboardFoundPage() {
  const result = await getMyFoundItemsAction(24);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHeader
        title="Found Items"
        description="Items you've reported as found. Available items can be claimed by their owners."
      >
        <Button asChild>
          <Link href="/dashboard/found/new">
            <Plus className="mr-2 h-4 w-4" />
            Report Found Item
          </Link>
        </Button>
      </PageHeader>

      <FoundItemList items={result.data ?? []} />
    </div>
  );
}
