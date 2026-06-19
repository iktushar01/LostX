import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { LostItemList } from "@/components/lost-items/LostItemList";
import { getMyLostItemsAction } from "@/actions/lostx/lost-item.actions";
import { Button } from "@/components/ui/button";

export default async function DashboardLostPage() {
  const result = await getMyLostItemsAction(24);

  return (
    <div className="mx-auto space-y-8">
      <PageHeader
      >
        <Button asChild>
          <Link href="/dashboard/lost/new">
            <Plus className="mr-2 h-4 w-4" />
            Report Lost Item
          </Link>
        </Button>
      </PageHeader>

      <LostItemList items={result.data ?? []} />
    </div>
  );
}
