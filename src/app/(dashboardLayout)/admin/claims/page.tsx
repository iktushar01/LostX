import { Suspense } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ClaimsTable, ClaimsTableSkeleton } from "@/components/admin/claims-table";
import { getAllClaimsAction } from "@/actions/lostx/claim.actions";
import { ClaimStatus } from "@/types/lostx.types";

interface AdminClaimsPageProps {
  searchParams: Promise<{ search?: string; status?: string }>;
}

async function ClaimsContent({
  search,
  status,
}: {
  search?: string;
  status?: string;
}) {
  const validStatuses: ClaimStatus[] = ["PENDING", "APPROVED", "REJECTED"];
  const statusFilter =
    status && validStatuses.includes(status as ClaimStatus)
      ? (status as ClaimStatus)
      : undefined;

  const result = await getAllClaimsAction({
    search,
    status: statusFilter,
  });

  return (
    <ClaimsTable
      claims={result.data ?? []}
      initialSearch={search}
      initialStatus={statusFilter ?? "all"}
    />
  );
}

export default async function AdminClaimsPage({ searchParams }: AdminClaimsPageProps) {
  const { search, status } = await searchParams;

  return (
    <div className="p-6">
      <PageHeader
        title="Claim Management"
        description="Review ownership claims submitted by users."
      />
      <Suspense fallback={<ClaimsTableSkeleton />}>
        <ClaimsContent search={search} status={status} />
      </Suspense>
    </div>
  );
}
