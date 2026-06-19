import Link from "next/link";
import { getAdminStatsAction, getAdminAnalyticsAction } from "@/actions/lostx/admin.actions";
import { StatsCards } from "@/components/admin/stats-cards";
import { AnalyticsPanel } from "@/components/admin/analytics-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, ArrowRight, FileCheck, PackageSearch } from "lucide-react";

export default async function AdminDashboardPage() {
  const [result, analyticsResult] = await Promise.all([
    getAdminStatsAction(),
    getAdminAnalyticsAction(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Admin Panel</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Platform overview and claim review queue.
        </p>
      </div>

      {!result.success || !result.data ? (
        <Alert variant="destructive">
          <AlertTitle>Unable to load statistics</AlertTitle>
          <AlertDescription>
            {result.message ?? "Please try again later."}
          </AlertDescription>
        </Alert>
      ) : (
        <StatsCards stats={result.data} />
      )}

      {analyticsResult.success && analyticsResult.data ? (
        <AnalyticsPanel analytics={analyticsResult.data} />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              Claim Review Queue
            </CardTitle>
            <CardDescription>
              Review ownership claims, compare verification answers, and approve or reject.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/claims">
                Manage Claims
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-emerald-600" />
              Review Workflow
            </CardTitle>
            <CardDescription>How admin review fits into LostX</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. User submits claim with verification answer</p>
            <p>2. Staff review verification answers and AI recommendations</p>
            <p>3. Otherwise staff reviews pending claims</p>
            <p>4. Claimant confirms receipt → finder marks returned</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
              User Reports
            </CardTitle>
            <CardDescription>
              Review user reports and apply admin-only trust actions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild>
              <Link href="/admin/user-reports">
                Review Reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageSearch className="h-5 w-5 text-violet-600" />
              Item Moderation
            </CardTitle>
            <CardDescription>
              Remove spam listings and feature important items.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild>
              <Link href="/admin/items">
                Manage Items
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
