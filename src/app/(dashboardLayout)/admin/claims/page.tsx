import { PageHeader } from "@/components/shared/PageHeader";
import { AdminClaimsTable } from "@/components/claims/AdminClaimsTable";
import { getAllClaimsAction } from "@/actions/lostx/claim.actions";

export default async function AdminClaimsPage() {
  const result = await getAllClaimsAction();

  return (
    <div className="p-6">
      <PageHeader
        title="Claim Management"
        description="Review, approve, or reject ownership claims."
      />
      <AdminClaimsTable claims={result.data ?? []} />
    </div>
  );
}
