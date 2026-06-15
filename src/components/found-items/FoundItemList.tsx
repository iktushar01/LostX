import { PackageSearch } from "lucide-react";
import { ItemCard } from "@/components/shared/ItemCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { FoundItem } from "@/types/lostx.types";

interface FoundItemListProps {
  items: FoundItem[];
}

export function FoundItemList({ items }: FoundItemListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No Found Items Yet"
        description="Found something on campus? Report it so the owner can browse and claim it."
        icon={<PackageSearch className="h-6 w-6" />}
        actionLabel="Report Found Item"
        actionHref="/dashboard/found/new"
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
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
  );
}
