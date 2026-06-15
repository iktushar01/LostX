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
        title="No found items yet"
        description="Report something you found on campus."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
