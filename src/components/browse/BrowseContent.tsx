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
import { cn } from "@/lib/utils";
import { ITEM_CATEGORIES, BrowseItem, BrowseMatchSuggestions, ItemCategory, ScoredMatch } from "@/types/lostx.types";
import { formatLabel } from "@/components/shared/ItemBadges";
import { Search, Sparkles, Filter } from "lucide-react";
import { ItemCard } from "@/components/shared/ItemCard";
import { EmptyState } from "@/components/shared/EmptyState";
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
    <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        {/* Search Input */}
        <div className="relative flex-1 space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <Search className="h-3 w-3" /> search feed
          </label>
          <div className="relative">
            <Input
              placeholder="What did you lose or find? (e.g. Airpods Pro)..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-11 border-zinc-200/80 bg-zinc-50/50 rounded-xl focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white transition-all pl-4 dark:border-zinc-800/80 dark:bg-zinc-950/40"
            />
          </div>
        </div>

        {/* Dynamic Type Switcher (Pills instead of dropdown) */}
        <div className="space-y-2 min-w-[240px]">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            status filter
          </label>
          <div className="grid grid-cols-3 gap-1 bg-zinc-100 dark:bg-zinc-900/80 p-1.5 rounded-xl h-11 items-center">
            {["all", "lost", "found"].map((t) => (
              <button
                key={t}
                onClick={() => onTypeChange(t)}
                className={cn(
                  "h-8 rounded-lg text-xs font-semibold capitalize transition-all duration-200",
                  type === t
                    ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm scale-[1.02]"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Category Select Dropdown */}
        <div className="space-y-2 sm:w-56">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <Filter className="h-3 w-3" /> category
          </label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="h-11 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border-zinc-200/80 dark:border-zinc-800/80 focus:ring-black dark:focus:ring-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All categories</SelectItem>
              {ITEM_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {formatLabel(cat)}
                </SelectItem>
              ))}
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
    <div className="space-y-12">
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
        <div className="space-y-14">
          {showLost && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Lost Items
                </h2>
                <Badge className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-full font-mono text-xs px-2.5">
                  {filteredLost.length}
                </Badge>
              </div>
              {filteredLost.length === 0 ? (
                <p className="text-sm text-zinc-400 dark:text-zinc-500">No lost items match your filters.</p>
              ) : (
                <BrowseItemGrid
                  items={filteredLost}
                  getTopMatch={(item) => matchSuggestions?.byLostId[item.id]?.[0]}
                />
              )}
            </section>
          )}

          {showFound && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-t border-zinc-100 dark:border-zinc-900 pt-10">
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Found Items
                </h2>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full font-mono text-xs px-2.5 border border-emerald-500/20">
                  {filteredFound.length}
                </Badge>
              </div>
              {filteredFound.length === 0 ? (
                <p className="text-sm text-zinc-400 dark:text-zinc-500">No found items match your filters.</p>
              ) : (
                <BrowseItemGrid
                  items={filteredFound}
                  getTopMatch={(item) => matchSuggestions?.byFoundId[item.id]?.[0]}
                />
              )}
            </section>
          )}
        </div>
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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => {
        const date = item.itemType === "lost" ? item.dateLost : item.dateFound;
        const topMatch = getTopMatch?.(item);
        return (
          <div key={`${item.itemType}-${item.id}`} className="group relative space-y-3 flex flex-col justify-between">
            <div className="transition-transform duration-300 group-hover:-translate-y-1">
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
            </div>
            {topMatch && (
              <div className="relative overflow-hidden flex items-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/10 px-3 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.05)]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]" />
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-indigo-500 animate-pulse" />
                <span className="truncate">
                  Match: <span className="font-bold">{topMatch.title}</span> ({topMatch.score}%)
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}