import Link from "next/link";
import { notFound } from "next/navigation";
import { getClaimByIdAction } from "@/actions/lostx/claim.actions";
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
    <div className="mx-auto max-w-6xl space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/claims">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to claims
        </Link>
      </Button>

      <div className="space-y-1">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Claim Review</p>
        <h1 className="text-2xl font-semibold tracking-tight">Claim Details</h1>
        <p className="text-sm text-muted-foreground">
          Compare verification answers and take action.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle>Claim Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Status
                </p>
                <div className="mt-1">
                  <ClaimStatusBadge status={claim.status} />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Submitted
                </p>
                <p className="mt-1 font-medium">{formatDate(claim.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  User Answer
                </p>
                <p className="mt-1 whitespace-pre-wrap rounded-lg border bg-blue-50/50 p-3 dark:bg-blue-950/20">
                  {claim.answer}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle>Claimant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Name
                </p>
                <p className="mt-1 font-medium">{claim.user?.name ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Email
                </p>
                <p className="mt-1">{claim.user?.email ?? "—"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle>Found Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                <div className="aspect-square overflow-hidden rounded-xl border bg-muted">
                  {foundItem?.imageUrl ? (
                    <img
                      src={foundItem.imageUrl}
                      alt={foundItem.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">{foundItem?.title ?? "—"}</p>
                  {foundItem?.category && <CategoryBadge category={foundItem.category} />}
                  <p className="text-muted-foreground">{foundItem?.location ?? "—"}</p>
                  <Badge variant="outline">
                    {foundItem?.status ? formatLabel(foundItem.status) : "—"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle>Verification Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Linked Lost Report
                </p>
                <p className="mt-1 font-medium">{lostItem?.title ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Verification Question
                </p>
                <p className="mt-1 text-sm">
                  {lostItem?.verificationQuestion ?? "No question provided"}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Expected Answer
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm font-medium">
                    {lostItem?.verificationAnswer ?? "—"}
                  </p>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    User Answer
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm">{claim.answer}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ClaimActions claimId={claim.id} status={claim.status} redirectTo="/admin/claims" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
