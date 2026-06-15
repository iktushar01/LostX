import { Suspense } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchBar } from "@/components/shared/SearchBar";
import { ItemCard } from "@/components/shared/ItemCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { getLostItemsAction } from "@/actions/lostx/lost-item.actions";
import { getFoundItemsAction } from "@/actions/lostx/found-item.actions";

interface BrowsePageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams;
  const query = {
    searchTerm: params.searchTerm,
    category: params.category,
    limit: 12,
  };
  const type = params.type ?? "all";

  const [lostResult, foundResult] = await Promise.all([
    type === "found" ? Promise.resolve({ data: [] }) : getLostItemsAction(query),
    type === "lost" ? Promise.resolve({ data: [] }) : getFoundItemsAction(query),
  ]);

  const lostItems = lostResult.data ?? [];
  const foundItems = foundResult.data ?? [];

  return (
    <div className="container mx-auto px-4 py-10">
      <PageHeader
        title="Browse Lost & Found"
        description="Search and filter items reported across campus."
      />

      <Suspense fallback={<Skeleton className="mb-8 h-24 w-full" />}>
        <SearchBar />
      </Suspense>

      {(type === "all" || type === "lost") && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">Lost Items</h2>
          {lostItems.length === 0 ? (
            <EmptyState title="No lost items found" description="Try adjusting your search or filters." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lostItems.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  type="lost"
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  location={item.location}
                  date={item.dateLost}
                  status={item.status}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {(type === "all" || type === "found") && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">Found Items</h2>
          {foundItems.length === 0 ? (
            <EmptyState title="No found items found" description="Try adjusting your search or filters." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {foundItems.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  type="found"
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  location={item.location}
                  date={item.dateFound}
                  status={item.status}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
