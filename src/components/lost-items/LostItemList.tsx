import { Search } from "lucide-react";
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
        title="No Lost Items Yet"
        description="Report a lost item with a verification question so you can claim matching found items later."
        icon={<Search className="h-6 w-6" />}
        actionLabel="Report Lost Item"
        actionHref="/dashboard/lost/new"
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
