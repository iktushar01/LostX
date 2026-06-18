import { PageHeader } from "@/components/shared/PageHeader";
import { BrowseContent } from "@/components/browse/BrowseContent";
import { getLostItemsAction } from "@/actions/lostx/lost-item.actions";
import { getFoundItemsAction } from "@/actions/lostx/found-item.actions";
import { getBrowseMatchSuggestionsAction } from "@/actions/lostx/match.actions";
import { BrowseItem } from "@/types/lostx.types";

export default async function BrowsePage() {
  const [lostResult, foundResult, matchResult] = await Promise.all([
    getLostItemsAction({ limit: 100 }),
    getFoundItemsAction({ limit: 100 }),
    getBrowseMatchSuggestionsAction(),
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
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHeader
        title="Browse Items"
        description="Search and filter all lost & found reports. Found something familiar? View details and submit a claim."
      />
      <BrowseContent
        lostItems={lostItems}
        foundItems={foundItems}
        matchSuggestions={matchResult.data}
      />
    </div>
  );
}
