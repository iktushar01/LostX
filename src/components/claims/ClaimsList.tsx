import Link from "next/link";
import { Claim } from "@/types/lostx.types";
import { StatusBadge } from "@/components/shared/ItemBadges";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClaimsListProps {
  claims: Claim[];
}

export function ClaimsList({ claims }: ClaimsListProps) {
  if (claims.length === 0) {
    return (
      <EmptyState
        title="No claims submitted"
        description="Find an item on the browse page and submit a claim if it's yours."
      />
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Title</TableHead>
            <TableHead>Claim Status</TableHead>
            <TableHead>Submission Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claims.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell>
                <Link
                  href={`/dashboard/found/${claim.foundItemId}`}
                  className="font-medium hover:underline"
                >
                  {claim.foundItem?.title ?? "Found item"}
                </Link>
              </TableCell>
              <TableCell>
                <StatusBadge status={claim.status} />
              </TableCell>
              <TableCell>{new Date(claim.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
