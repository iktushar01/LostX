import Link from "next/link";
import { notFound } from "next/navigation";
import { getClaimByIdAction } from "@/actions/lostx/claim.actions";
import { PageHeader } from "@/components/shared/PageHeader";
import { ClaimStatusBadge } from "@/components/admin/claim-status-badge";
import { ClaimActions } from "@/components/admin/claim-actions";
import { CategoryBadge, formatLabel } from "@/components/shared/ItemBadges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        description="Review claim information and take action."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Claim Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Claim ID</p>
              <p className="font-mono text-xs">{claim.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Message</p>
              <p className="whitespace-pre-wrap">{claim.message}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <ClaimStatusBadge status={claim.status} />
            </div>
            <div>
              <p className="text-muted-foreground">Created Date</p>
              <p>{formatDate(claim.createdAt)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
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
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Found Item Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-[200px_1fr]">
              <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
                {foundItem?.imageUrl ? (
                  <img
                    src={foundItem.imageUrl}
                    alt={foundItem.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <div className="space-y-3 text-sm">
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
                  <p className="text-muted-foreground">Date Found</p>
                  <p>
                    {foundItem?.dateFound
                      ? formatDate(foundItem.dateFound)
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Item Status</p>
                  <p>{foundItem?.status ? formatLabel(foundItem.status) : "—"}</p>
                </div>
              </div>
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
