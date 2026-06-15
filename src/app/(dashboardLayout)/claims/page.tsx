import { PageHeader } from "@/components/shared/PageHeader";
import { ClaimsGrid } from "@/components/claims/ClaimsGrid";
import { getMyClaimsAction } from "@/actions/lostx/claim.actions";

export default async function ClaimsPage() {
  const result = await getMyClaimsAction();

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHeader
        title="My Claims"
        description="Track ownership claims you've submitted. Each claim goes through review before recovery."
      />
      <ClaimsGrid claims={result.data ?? []} />
    </div>
  );
}
