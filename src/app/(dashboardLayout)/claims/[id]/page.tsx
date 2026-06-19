import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ShieldCheck, Sparkles, FileText, Lock } from "lucide-react";
import { getClaimByIdAction, getClaimMessagesAction } from "@/actions/lostx/claim.actions";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/ItemBadges";
import { ClaimChatPanel } from "@/components/claims/ClaimChatPanel";
import { ConfirmReceivedButton } from "@/components/claims/ConfirmReceivedButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  const isClaimant = claim.userId === currentUserId;

  return (
    <div className="mx-auto  space-y-6 px-4 py-6 animate-in fade-in duration-300">
      {/* Upper Navigation and Header layout */}
      <div className="flex flex-col gap-4">
        <div>
          <Link 
            href="/claims" 
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to claims
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border rounded-xl p-6 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-card-foreground">
                {claim.foundItem?.title ?? "Claim Details"}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Review claim status, verification markers, and coordinate handoff details.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center bg-muted/40 p-1.5 rounded-lg border">
            <StatusBadge status={claim.status} />
            {claim.autoApproved && (
              <Badge variant="secondary" className="font-medium rounded-md px-2.5 py-0.5 text-xs gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none">
                <Sparkles className="h-3 w-3" /> Auto-approved
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* Left Side: Summary & Actionable Data */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Handoff Section (High Importance Highlight) */}
          {claim.handoffCode && claim.status === "APPROVED" && isClaimant && (
            <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.03] to-transparent p-5 shadow-sm">
              <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-6 -mt-6" />
              <div className="flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-wider mb-3">
                <ShieldCheck className="h-4 w-4 text-primary" /> Secure Handoff Pass
              </div>
              <div className="bg-background/60 backdrop-blur-sm border border-dashed border-primary/30 rounded-lg p-4 text-center space-y-2">
                <p className="font-mono text-3xl font-bold tracking-[0.25em] text-foreground select-all pr-[-0.25em]">
                  {claim.handoffCode}
                </p>
                <p className="text-xs text-muted-foreground leading-normal max-w-[280px] mx-auto">
                  Present this verification token to staff at the lost-and-found desk.
                </p>
              </div>
            </div>
          )}

          {/* Core Specs List */}
          <div className="bg-card border rounded-xl p-5 shadow-sm space-y-5">
            {claim.matchScore != null && (
              <div className="space-y-2 bg-muted/30 p-3 rounded-lg border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-emerald-500" /> AI Match Confidence
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {claim.matchScore}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                    style={{ width: `${claim.matchScore}%` }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-muted rounded-lg shrink-0 mt-0.5">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground block">Found Item Title</span>
                  <p className="text-sm font-medium text-foreground">{claim.foundItem?.title ?? "—"}</p>
                </div>
              </div>

              {claim.lostItem?.title && (
                <>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded-lg shrink-0 mt-0.5">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-muted-foreground block">Linked User Report</span>
                      <p className="text-sm font-medium text-foreground">{claim.lostItem.title}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>Filed on {new Date(claim.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
              </div>
            </div>

            {/* Quick Action Button Spacer */}
            {claim.status === "APPROVED" && isClaimant && (
              <div className="pt-2">
                <ConfirmReceivedButton
                  claimId={claim.id}
                  alreadyConfirmed={Boolean(claim.receivedConfirmedAt)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Chat & Communication interface */}
        <div className="lg:col-span-7 flex flex-col">
          {claim.status === "APPROVED" ? (
            <div className="rounded-xl border bg-card p-1 shadow-sm h-full min-h-[450px] flex flex-col">
              <ClaimChatPanel
                claimId={claim.id}
                currentUserId={currentUserId}
                messages={messagesResult.data ?? []}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed min-h-[450px] bg-muted/20 backdrop-blur-sm space-y-4">
              <div className="p-4 bg-background border rounded-full shadow-sm text-muted-foreground">
                <Lock className="h-6 w-6" />
              </div>
              <div className="max-w-xs space-y-1.5">
                <h3 className="text-sm font-semibold tracking-tight text-foreground">Secure Chat Locked</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The secure message terminal activates immediately after administrator verification and verification approval.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}