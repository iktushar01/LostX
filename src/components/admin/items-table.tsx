"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, StarOff, Trash2 } from "lucide-react";
import { AdminManagedItem } from "@/types/lostx.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatLabel } from "@/components/shared/ItemBadges";
import {
  deleteAdminItemAction,
  toggleAdminItemFeaturedAction,
} from "@/actions/lostx/admin.actions";
import { toast } from "sonner";

interface AdminItemsTableProps {
  items: AdminManagedItem[];
  initialType?: string;
  initialSearch?: string;
}

const PAGE_SIZE = 12;

export function AdminItemsTable({
  items,
  initialType = "lost",
  initialSearch = "",
}: AdminItemsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [actionPendingId, setActionPendingId] = useState<string | null>(null);
  const [type, setType] = useState(initialType);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(0);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (type) params.set("type", type);
    if (search.trim()) params.set("search", search.trim());
    else params.delete("search");
    setPage(0);
    startTransition(() => {
      router.push(`/admin/items?${params.toString()}`);
    });
  }, [router, searchParams, search, type]);

  const pagedItems = useMemo(
    () => items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [items, page],
  );

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  const handleToggleFeatured = async (item: AdminManagedItem) => {
    setActionPendingId(item.id);
    const result = await toggleAdminItemFeaturedAction(
      item.itemType,
      item.id,
      !item.isFeatured,
    );
    setActionPendingId(null);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(item.isFeatured ? "Item unfeatured" : "Item featured");
    router.refresh();
  };

  const handleDelete = async (item: AdminManagedItem) => {
    setActionPendingId(item.id);
    const result = await deleteAdminItemAction(item.itemType, item.id);
    setActionPendingId(null);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Item removed");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-card p-4 shadow-sm sm:flex-row sm:items-center dark:border-slate-800">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="h-10 w-full sm:w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lost">Lost reports</SelectItem>
            <SelectItem value="found">Found reports</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyFilters()}
        />
        <Button onClick={applyFilters} disabled={isPending}>
          {isPending ? "Loading..." : "Apply"}
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="No items found"
          description="Try adjusting type or search filters."
        />
      ) : (
        <Card className="overflow-hidden border-slate-200/80 shadow-sm dark:border-slate-800">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Claims</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedItems.map((item) => {
                  const busy = actionPendingId === item.id;
                  return (
                    <TableRow key={`${item.itemType}-${item.id}`}>
                      <TableCell>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.location}</p>
                        <p className="text-xs text-muted-foreground">{formatLabel(item.category)}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{item.user?.name ?? "—"}</p>
                        <p className="text-xs text-muted-foreground">{item.user?.email ?? "—"}</p>
                      </TableCell>
                      <TableCell>{formatLabel(item.status)}</TableCell>
                      <TableCell>{item.claimCount}</TableCell>
                      <TableCell>{item.isFeatured ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={busy}
                            onClick={() => handleToggleFeatured(item)}
                          >
                            {item.isFeatured ? (
                              <StarOff className="h-4 w-4" />
                            ) : (
                              <Star className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={busy}
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
            <p>
              Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, items.length)} of{" "}
              {items.length}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

