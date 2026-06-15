"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITEM_CATEGORIES, BrowseItem, ItemCategory } from "@/types/lostx.types";
import { formatLabel } from "@/components/shared/ItemBadges";
import { Search } from "lucide-react";
import { BrowseItemCard } from "./BrowseItemCard";

interface BrowseFiltersProps {
  search: string;
  category: string;
  type: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export function BrowseFilters({
  search,
  category,
  type,
  onSearchChange,
  onCategoryChange,
  onTypeChange,
}: BrowseFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-end">
      <div className="relative flex-1 space-y-1">
        <label className="text-sm font-medium">Search</label>
        <Search className="absolute bottom-2.5 left-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search title or description..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="space-y-1 sm:w-44">
        <label className="text-sm font-medium">Category</label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {ITEM_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {formatLabel(cat)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 sm:w-36">
        <label className="text-sm font-medium">Type</label>
        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="lost">Lost Items</SelectItem>
            <SelectItem value="found">Found Items</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function matchesSearch(item: BrowseItem, term: string) {
  if (!term.trim()) return true;
  const q = term.toLowerCase();
  return (
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );
}

function matchesCategory(item: BrowseItem, category: string) {
  if (category === "all") return true;
  return item.category === category;
}

interface BrowseContentProps {
  lostItems: BrowseItem[];
  foundItems: BrowseItem[];
}

export function BrowseContent({ lostItems, foundItems }: BrowseContentProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearch(params.get("searchTerm") ?? "");
    setCategory(params.get("category") ?? "all");
    setType(params.get("type") ?? "all");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("searchTerm", search.trim());
    if (category !== "all") params.set("category", category);
    if (type !== "all") params.set("type", type);
    const query = params.toString();
    const next = query ? `?${query}` : "";
    window.history.replaceState(null, "", `/browse${next}`);
  }, [search, category, type]);

  const filteredLost = useMemo(
    () =>
      lostItems.filter(
        (item) =>
          matchesSearch(item, search) &&
          matchesCategory(item, category as ItemCategory | "all"),
      ),
    [lostItems, search, category],
  );

  const filteredFound = useMemo(
    () =>
      foundItems.filter(
        (item) =>
          matchesSearch(item, search) &&
          matchesCategory(item, category as ItemCategory | "all"),
      ),
    [foundItems, search, category],
  );

  const showLost = type === "all" || type === "lost";
  const showFound = type === "all" || type === "found";
  const hasResults =
    (showLost && filteredLost.length > 0) || (showFound && filteredFound.length > 0);

  return (
    <div className="space-y-8">
      <BrowseFilters
        search={search}
        category={category}
        type={type}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onTypeChange={setType}
      />

      {!hasResults ? (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <p className="text-lg font-medium">No items found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          {showLost && (
            <section>
              <h2 className="mb-4 text-xl font-semibold">Lost Items</h2>
              {filteredLost.length === 0 ? (
                <p className="text-sm text-muted-foreground">No lost items match your filters.</p>
              ) : (
                <BrowseItemGrid items={filteredLost} />
              )}
            </section>
          )}

          {showFound && (
            <section>
              <h2 className="mb-4 text-xl font-semibold">Found Items</h2>
              {filteredFound.length === 0 ? (
                <p className="text-sm text-muted-foreground">No found items match your filters.</p>
              ) : (
                <BrowseItemGrid items={filteredFound} />
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}

function BrowseItemGrid({ items }: { items: BrowseItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <BrowseItemCard key={`${item.itemType}-${item.id}`} item={item} />
      ))}
    </div>
  );
}
