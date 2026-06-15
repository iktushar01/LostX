import { PageHeader } from "@/components/shared/PageHeader";
import { ClaimsList } from "@/components/claims/ClaimsList";
import { getMyClaimsAction } from "@/actions/lostx/claim.actions";

export default async function ClaimsPage() {
  const result = await getMyClaimsAction();

  return (
    <div className="container mx-auto px-4 py-10">
      <PageHeader
        title="My Claims"
        description="Track the status of your ownership claims."
      />
      <ClaimsList claims={result.data ?? []} />
    </div>
  );
}
