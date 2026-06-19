import Link from "next/link";
import { notFound } from "next/navigation";
import { getClaimByIdAction, getClaimMessagesAction } from "@/actions/lostx/claim.actions";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { ClaimStatusBadge } from "@/components/admin/claim-status-badge";
import { ClaimActions } from "@/components/admin/claim-actions";
import { CategoryBadge, formatLabel } from "@/components/shared/ItemBadges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { ClaimChatPanel } from "@/components/claims/ClaimChatPanel";

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
  const [result, messagesResult, userResult] = await Promise.all([
    getClaimByIdAction(id),
    getClaimMessagesAction(id),
    getCurrentUserAction(),
  ]);

  if (!result.success || !result.data || !userResult.success || !userResult.data) {
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
              <CardTitle>AI Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {claim.matchScore != null && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Match score
                  </p>
                  <p className="mt-1 font-medium">{claim.matchScore}%</p>
                </div>
              )}
              {claim.aiConfidence != null && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    AI confidence
                  </p>
                  <p className="mt-1 font-medium">{claim.aiConfidence}% — {claim.aiRecommendation}</p>
                </div>
              )}
              {Array.isArray(claim.aiQuestions) && claim.aiQuestions.length > 0 ? (
                <div className="space-y-3">
                  {claim.aiQuestions.map((q) => {
                    const answer = Array.isArray(claim.aiAnswers)
                      ? claim.aiAnswers.find((a) => a.id === q.id)?.answer
                      : undefined;
                    return (
                      <div key={q.id} className="rounded-lg border p-3">
                        <p className="text-xs text-muted-foreground">{q.question}</p>
                        <p className="mt-1 font-medium">{answer ?? "—"}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Legacy verification: {lostItem?.verificationQuestion ?? "—"}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle>Private details (admin only)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">Lost — private</p>
                <p className="mt-1 whitespace-pre-wrap rounded-lg border bg-muted/40 p-3">
                  {lostItem?.privateDescriptionPlain ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">Found — private</p>
                <p className="mt-1 whitespace-pre-wrap rounded-lg border bg-muted/40 p-3">
                  {foundItem?.privateDescriptionPlain ?? "—"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {foundItem?.showImagePublic === false && (
                  <Badge variant="outline">Found image hidden on browse</Badge>
                )}
                {lostItem?.showImagePublic === false && (
                  <Badge variant="outline">Lost image hidden on browse</Badge>
                )}
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
              <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Claimant response summary
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm">{claim.answer}</p>
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

          {claim.status === "APPROVED" ? (
            <ClaimChatPanel
              claimId={claim.id}
              currentUserId={userResult.data.id}
              messages={messagesResult.data ?? []}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
