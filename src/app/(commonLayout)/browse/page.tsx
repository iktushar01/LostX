import { PageHeader } from "@/components/shared/PageHeader";
import { BrowseContent } from "@/components/browse/BrowseContent";
import { getLostItemsAction } from "@/actions/lostx/lost-item.actions";
import { getFoundItemsAction } from "@/actions/lostx/found-item.actions";
import { BrowseItem } from "@/types/lostx.types";

export default async function BrowsePage() {
  const [lostResult, foundResult] = await Promise.all([
    getLostItemsAction({ limit: 100 }),
    getFoundItemsAction({ limit: 100 }),
  ]);

  const lostItems: BrowseItem[] = (lostResult.data ?? []).map((item) => ({
    ...item,
    itemType: "lost" as const,
  }));

  const foundItems: BrowseItem[] = (foundResult.data ?? []).map((item) => ({
    ...item,
    itemType: "found" as const,
  }));

  return (
    <div className="container mx-auto px-4 py-10">
      <PageHeader
        title="Browse Lost & Found"
        description="Search and filter items reported across campus."
      />
      <BrowseContent lostItems={lostItems} foundItems={foundItems} />
    </div>
  );
}
