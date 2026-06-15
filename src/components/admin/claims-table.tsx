"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCallback, useState, useTransition } from "react";
import { Claim } from "@/types/lostx.types";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatLabel } from "@/components/shared/ItemBadges";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { ClaimStatusBadge } from "./claim-status-badge";
import { Search } from "lucide-react";

interface ClaimsTableProps {
  claims: Claim[];
  initialSearch?: string;
  initialStatus?: string;
}

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ClaimsTable({
  claims,
  initialSearch = "",
  initialStatus = "all",
}: ClaimsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus || "all");

  const applyFilters = useCallback(
    (nextSearch: string, nextStatus: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextSearch.trim()) {
        params.set("search", nextSearch.trim());
      } else {
        params.delete("search");
      }

      if (nextStatus && nextStatus !== "all") {
        params.set("status", nextStatus);
      } else {
        params.delete("status");
      }

      startTransition(() => {
        router.push(`/admin/claims?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  if (claims.length === 0 && !initialSearch && initialStatus === "all") {
    return (
      <div className="space-y-4">
        <ClaimsFilters
          search={search}
          status={status}
          isPending={isPending}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onApply={() => applyFilters(search, status)}
        />
        <EmptyState
          title="No claims have been submitted yet."
          description="When users submit ownership claims, they will appear here for review."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ClaimsFilters
        search={search}
        status={status}
        isPending={isPending}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onApply={() => applyFilters(search, status)}
      />

      {claims.length === 0 ? (
        <EmptyState
          title="No claims match your filters"
          description="Try adjusting the search or status filter."
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Claimant</TableHead>
                <TableHead>Found Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Link
                      href={`/admin/claims/${claim.id}`}
                      className="font-mono text-xs text-primary hover:underline"
                    >
                      {claim.id.slice(0, 8)}…
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/claims/${claim.id}`} className="block">
                      <p className="font-medium">{claim.user?.name ?? "—"}</p>
                      <p className="text-xs text-muted-foreground">
                        {claim.user?.email ?? "—"}
                      </p>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/claims/${claim.id}`} className="font-medium hover:underline">
                      {claim.foundItem?.title ?? "—"}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {claim.foundItem?.category
                      ? formatLabel(claim.foundItem.category)
                      : "—"}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="line-clamp-2 text-sm">{claim.message}</p>
                  </TableCell>
                  <TableCell>
                    <ClaimStatusBadge status={claim.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(claim.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function ClaimsFilters({
  search,
  status,
  isPending,
  onSearchChange,
  onStatusChange,
  onApply,
}: {
  search: string;
  status: string;
  isPending: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onApply: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by claimant name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onApply()}
          className="pl-9"
        />
      </div>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={onApply} disabled={isPending} className="sm:w-auto">
        {isPending ? "Loading..." : "Apply"}
      </Button>
    </div>
  );
}

export function ClaimsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="h-10 flex-1 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-44 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />
      </div>
      <div className="rounded-lg border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse border-b bg-muted/30 last:border-0" />
        ))}
      </div>
    </div>
  );
}
