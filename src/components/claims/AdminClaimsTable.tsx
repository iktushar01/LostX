"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Claim } from "@/types/lostx.types";
import { StatusBadge, formatLabel } from "@/components/shared/ItemBadges";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateClaimStatusAction } from "@/actions/lostx/claim.actions";

interface AdminClaimsTableProps {
  claims: Claim[];
}

export function AdminClaimsTable({ claims: initialClaims }: AdminClaimsTableProps) {
  const [claims, setClaims] = useState(initialClaims);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleUpdate = async (claimId: string, status: "APPROVED" | "REJECTED") => {
    setLoadingId(claimId);
    const result = await updateClaimStatusAction(claimId, status);
    setLoadingId(null);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(`Claim ${status.toLowerCase()}`);
    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status } : c)),
    );
  };

  if (claims.length === 0) {
    return <EmptyState title="No claims to review" description="Claims will appear here when users submit them." />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Claimant</TableHead>
            <TableHead>Found Item</TableHead>
            <TableHead>User Answer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claims.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell>
                <p className="font-medium">{claim.user?.name}</p>
                <p className="text-xs text-muted-foreground">{claim.user?.email}</p>
              </TableCell>
              <TableCell>
                <p className="font-medium">{claim.foundItem?.title}</p>
                <p className="text-xs text-muted-foreground">
                  {claim.foundItem?.category && formatLabel(claim.foundItem.category)}
                  {claim.foundItem?.location && ` · ${claim.foundItem.location}`}
                </p>
              </TableCell>
              <TableCell className="max-w-xs">
                <p className="line-clamp-3 text-sm">{claim.answer}</p>
              </TableCell>
              <TableCell><StatusBadge status={claim.status} /></TableCell>
              <TableCell className="text-right">
                {claim.status === "PENDING" ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={loadingId === claim.id}
                      onClick={() => handleUpdate(claim.id, "REJECTED")}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      disabled={loadingId === claim.id}
                      onClick={() => handleUpdate(claim.id, "APPROVED")}
                    >
                      {loadingId === claim.id && <Spinner className="mr-1" />}
                      Approve
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
