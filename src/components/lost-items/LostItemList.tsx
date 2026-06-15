import { ItemCard } from "@/components/shared/ItemCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { LostItem } from "@/types/lostx.types";

interface LostItemListProps {
  items: LostItem[];
}

export function LostItemList({ items }: LostItemListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No lost items yet"
        description="Report a lost item to help the community find it."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
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
  );
}
