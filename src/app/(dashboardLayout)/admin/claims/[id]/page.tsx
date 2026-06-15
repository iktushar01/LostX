import Link from "next/link";
import { notFound } from "next/navigation";
import { getClaimByIdAction } from "@/actions/lostx/claim.actions";
import { PageHeader } from "@/components/shared/PageHeader";
import { ClaimStatusBadge } from "@/components/admin/claim-status-badge";
import { ClaimActions } from "@/components/admin/claim-actions";
import { CategoryBadge, formatLabel } from "@/components/shared/ItemBadges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

interface AdminClaimDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminClaimDetailPage({ params }: AdminClaimDetailPageProps) {
  const { id } = await params;
  const result = await getClaimByIdAction(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const claim = result.data;
  const foundItem = claim.foundItem;
  const lostItem = claim.lostItem;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/claims">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to claims
          </Link>
        </Button>
      </div>

      <PageHeader
        title="Claim Details"
        description="Review claim information and compare verification answers."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Claimant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium">{claim.user?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p>{claim.user?.email ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <ClaimStatusBadge status={claim.status} />
            </div>
            <div>
              <p className="text-muted-foreground">Submitted</p>
              <p>{formatDate(claim.createdAt)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Found Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Title</p>
              <p className="font-medium">{foundItem?.title ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Category</p>
              {foundItem?.category ? (
                <CategoryBadge category={foundItem.category} />
              ) : (
                <p>—</p>
              )}
            </div>
            <div>
              <p className="text-muted-foreground">Location</p>
              <p>{foundItem?.location ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Item Status</p>
              <Badge variant="outline">
                {foundItem?.status ? formatLabel(foundItem.status) : "—"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Verification Review</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-lg border p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Verification Question
              </p>
              <p className="text-sm">
                {lostItem?.verificationQuestion ?? "No linked lost item report"}
              </p>
            </div>
            <div className="space-y-2 rounded-lg border p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Linked Lost Report
              </p>
              <p className="text-sm font-medium">{lostItem?.title ?? "—"}</p>
            </div>
            <div className="space-y-2 rounded-lg border border-green-200 bg-green-50/50 p-4 dark:border-green-900 dark:bg-green-950/20">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Expected Answer
              </p>
              <p className="whitespace-pre-wrap text-sm font-medium">
                {lostItem?.verificationAnswer ?? "—"}
              </p>
            </div>
            <div className="space-y-2 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                User Answer
              </p>
              <p className="whitespace-pre-wrap text-sm">{claim.answer}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ClaimActions claimId={claim.id} status={claim.status} />
        </CardContent>
      </Card>
    </div>
  );
}
