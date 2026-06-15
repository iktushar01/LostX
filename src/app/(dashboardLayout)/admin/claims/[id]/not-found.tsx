import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";

export default function ClaimNotFound() {
  return (
    <div className="p-6">
      <EmptyState
        title="Claim not found"
        description="This claim may have been removed or you do not have access to view it."
      />
      <div className="mt-4 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/admin/claims">Back to claims</Link>
        </Button>
      </div>
    </div>
  );
}
