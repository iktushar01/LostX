import { PageHeader } from "@/components/shared/PageHeader";
import { ClaimsGrid } from "@/components/claims/ClaimsGrid";
import { getMyClaimsAction } from "@/actions/lostx/claim.actions";

export default async function ClaimsPage() {
  const result = await getMyClaimsAction();

  return (
    <div className="mx-auto  space-y-8">
      <PageHeader
        title="My Claims"
        description="Track ownership claims you've submitted on found items."
      />
      <ClaimsGrid claims={result.data ?? []} />
    </div>
  );
}
