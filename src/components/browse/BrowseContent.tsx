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
import { Button } from "@/components/ui/button";
import { ITEM_CATEGORIES, BrowseItem, BrowseMatchSuggestions, ItemCategory, ScoredMatch } from "@/types/lostx.types";
import { formatLabel } from "@/components/shared/ItemBadges";
import { Search } from "lucide-react";
import { ItemCard } from "@/components/shared/ItemCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <div className="rounded-2xl border border-slate-200/80 bg-card p-4 shadow-sm dark:border-slate-800">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="relative flex-1 space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Search
          </label>
          <Search className="absolute bottom-2.5 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 border-slate-200 bg-slate-50 pl-9 dark:border-slate-800 dark:bg-slate-900/50"
          />
        </div>
        <div className="space-y-1.5 sm:w-48">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Category
          </label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="h-10">
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
        <div className="space-y-1.5 sm:w-40">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Type
          </label>
          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger className="h-10">
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
  matchSuggestions?: BrowseMatchSuggestions;
}

export function BrowseContent({ lostItems, foundItems, matchSuggestions }: BrowseContentProps) {
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
    window.history.replaceState(null, "", `/browse${query ? `?${query}` : ""}`);
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
    <div className="space-y-10">
      <BrowseFilters
        search={search}
        category={category}
        type={type}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onTypeChange={setType}
      />

      {!hasResults ? (
        <EmptyState
          title="No Results Found"
          description="Try adjusting your search or filters to find what you're looking for."
          actionLabel="Clear Filters"
          actionHref="/browse"
        />
      ) : (
        <>
          {showLost && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold tracking-tight">Lost Items</h2>
                <Badge variant="secondary">{filteredLost.length}</Badge>
              </div>
              {filteredLost.length === 0 ? (
                <p className="text-sm text-muted-foreground">No lost items match your filters.</p>
              ) : (
                <BrowseItemGrid
                  items={filteredLost}
                  getTopMatch={(item) => matchSuggestions?.byLostId[item.id]?.[0]}
                />
              )}
            </section>
          )}

          {showFound && (
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-t border-slate-200/80 pt-10 dark:border-slate-800">
                <h2 className="text-lg font-semibold tracking-tight">Found Items</h2>
                <Badge variant="secondary">{filteredFound.length}</Badge>
              </div>
              {filteredFound.length === 0 ? (
                <p className="text-sm text-muted-foreground">No found items match your filters.</p>
              ) : (
                <BrowseItemGrid
                  items={filteredFound}
                  getTopMatch={(item) => matchSuggestions?.byFoundId[item.id]?.[0]}
                />
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}

function BrowseItemGrid({
  items,
  getTopMatch,
}: {
  items: BrowseItem[];
  getTopMatch?: (item: BrowseItem) => ScoredMatch | undefined;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => {
        const date = item.itemType === "lost" ? item.dateLost : item.dateFound;
        const topMatch = getTopMatch?.(item);
        return (
          <div key={`${item.itemType}-${item.id}`} className="space-y-2">
            <ItemCard
              id={item.id}
              type={item.itemType}
              title={item.title}
              description={item.description}
              category={item.category}
              location={item.location}
              date={date}
              status={item.status}
              imageUrl={item.imageUrl}
              isFeatured={item.isFeatured}
            />
            {topMatch && (
              <div className="flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50/60 px-3 py-2 text-xs text-violet-700 dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300">
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  Suggested: {topMatch.title} ({topMatch.score}%)
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
