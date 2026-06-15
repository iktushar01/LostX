"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ITEM_CATEGORIES } from "@/types/lostx.types";
import { formatLabel } from "./ItemBadges";

interface SearchBarProps {
  showTypeFilter?: boolean;
}

export function SearchBar({ showTypeFilter = true }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("searchTerm") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [type, setType] = useState(searchParams.get("type") ?? "all");

  const apply = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("searchTerm", search.trim());
    if (category !== "all") params.set("category", category);
    if (showTypeFilter && type !== "all") params.set("type", type);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-1">
        <label className="text-sm font-medium">Search</label>
        <Input
          placeholder="Search title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />
      </div>
      <div className="space-y-1 sm:w-44">
        <label className="text-sm font-medium">Category</label>
        <Select value={category} onValueChange={setCategory}>
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
      {showTypeFilter && (
        <div className="space-y-1 sm:w-36">
          <label className="text-sm font-medium">Type</label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
              <SelectItem value="found">Found</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <Button onClick={apply} className="gap-2">
        <Search className="h-4 w-4" />
        Search
      </Button>
    </div>
  );
}
