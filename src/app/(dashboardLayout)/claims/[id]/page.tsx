import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getClaimByIdAction, getClaimMessagesAction } from "@/actions/lostx/claim.actions";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/ItemBadges";
import { ClaimChatPanel } from "@/components/claims/ClaimChatPanel";

interface ClaimDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClaimDetailPage({ params }: ClaimDetailPageProps) {
  const { id } = await params;
  const [claimResult, messagesResult, userResult] = await Promise.all([
    getClaimByIdAction(id),
    getClaimMessagesAction(id),
    getCurrentUserAction(),
  ]);

  if (!claimResult.success || !claimResult.data || !userResult.success || !userResult.data) {
    notFound();
  }

  const claim = claimResult.data;
  const currentUserId = userResult.data.id;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/claims">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to claims
        </Link>
      </Button>

      <PageHeader
        title={claim.foundItem?.title ?? "Claim details"}
        description="Review claim status and coordinate handoff after approval."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Claim Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <StatusBadge status={claim.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Submitted</span>
              <span>{new Date(claim.createdAt).toLocaleString()}</span>
            </div>
            <div>
              <p className="mb-1 text-muted-foreground">Found item</p>
              <p className="font-medium">{claim.foundItem?.title ?? "—"}</p>
            </div>
            {claim.lostItem?.title ? (
              <div>
                <p className="mb-1 text-muted-foreground">Linked lost report</p>
                <p className="font-medium">{claim.lostItem.title}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {claim.status === "APPROVED" ? (
          <ClaimChatPanel
            claimId={claim.id}
            currentUserId={currentUserId}
            messages={messagesResult.data ?? []}
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Claim Chat</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Chat unlocks after admin approval to coordinate pickup details.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

