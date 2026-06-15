"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCallback, useMemo, useState, useTransition } from "react";
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
import { ClaimTableActions } from "./claim-table-actions";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

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

const PAGE_SIZE = 10;

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
  const [page, setPage] = useState(0);

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

      setPage(0);
      startTransition(() => {
        router.push(`/admin/claims?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const totalPages = Math.max(1, Math.ceil(claims.length / PAGE_SIZE));
  const paginatedClaims = useMemo(
    () => claims.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [claims, page],
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
          title="No Claims Submitted"
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
        <Card className="overflow-hidden border-slate-200/80 shadow-sm dark:border-slate-800">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 dark:bg-slate-900/50">
                  <TableHead>Claimant</TableHead>
                  <TableHead>Found Item</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedClaims.map((claim) => (
                  <TableRow key={claim.id} className="hover:bg-muted/30">
                    <TableCell>
                      <Link href={`/admin/claims/${claim.id}`} className="block">
                        <p className="font-medium">{claim.user?.name ?? "—"}</p>
                        <p className="text-xs text-muted-foreground">
                          {claim.user?.email ?? "—"}
                        </p>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/claims/${claim.id}`}
                        className="font-medium hover:text-primary hover:underline"
                      >
                        {claim.foundItem?.title ?? "—"}
                      </Link>
                      {claim.foundItem?.category && (
                        <p className="text-xs text-muted-foreground">
                          {formatLabel(claim.foundItem.category)}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {claim.lostItem?.verificationQuestion ?? "—"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <ClaimStatusBadge status={claim.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(claim.createdAt)}
                    </TableCell>
                    <TableCell>
                      <ClaimTableActions claimId={claim.id} status={claim.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, claims.length)} of{" "}
              {claims.length}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
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
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-card p-4 shadow-sm sm:flex-row sm:items-center dark:border-slate-800">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by claimant name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onApply()}
          className="h-10 pl-9"
        />
      </div>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="h-10 w-full sm:w-[180px]">
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
      <Button onClick={onApply} disabled={isPending} className="h-10 sm:w-auto">
        {isPending ? "Loading..." : "Apply"}
      </Button>
    </div>
  );
}

export function ClaimsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-20 animate-pulse rounded-2xl border bg-muted/40" />
      <div className="rounded-xl border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse border-b bg-muted/20 last:border-0" />
        ))}
      </div>
    </div>
  );
}
