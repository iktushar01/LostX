import Link from "next/link";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { getDashboardStatsAction } from "@/actions/lostx/dashboard.actions";
import { getMyLostItemsAction } from "@/actions/lostx/lost-item.actions";
import { getMyFoundItemsAction } from "@/actions/lostx/found-item.actions";
import { getMyClaimsAction } from "@/actions/lostx/claim.actions";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { QuickActionCards } from "@/components/dashboard/QuickActionCards";
import { DashboardStatsCards } from "@/components/dashboard/DashboardStatsCards";
import { WorkflowGuide } from "@/components/dashboard/WorkflowGuide";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { ItemCard } from "@/components/shared/ItemCard";
import { ClaimCard } from "@/components/claims/ClaimCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const [userResult, statsResult, lostResult, foundResult, claimsResult, allLostResult] =
    await Promise.all([
      getCurrentUserAction(),
      getDashboardStatsAction(),
      getMyLostItemsAction(4),
      getMyFoundItemsAction(4),
      getMyClaimsAction(),
      getMyLostItemsAction(50),
    ]);

  const userName = userResult.success && userResult.data ? userResult.data.name : "there";
  const stats = statsResult.data ?? {
    lostReports: 0,
    foundReports: 0,
    approvedClaims: 0,
  };

  const lostItems = lostResult.data ?? [];
  const foundItems = foundResult.data ?? [];
  const allClaims = claimsResult.data ?? [];
  const claims = allClaims.slice(0, 4);
  const allLost = allLostResult.data ?? [];

  const pendingClaims = allClaims.filter((c) => c.status === "PENDING").length;
  const recoveredItems = allLost.filter((i) => i.status === "RECOVERED").length;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <WelcomeHeader name={userName} />

      <QuickActionCards />

      <DashboardStatsCards
        stats={stats}
        pendingClaims={pendingClaims}
        recoveredItems={recoveredItems}
      />

      <WorkflowGuide />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="border-slate-200/80 shadow-sm xl:col-span-2 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest lost & found updates</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ActivityTimeline
              lostItems={lostItems}
              foundItems={foundItems}
              claims={claims}
            />
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Claims</CardTitle>
              <CardDescription>Recovery progress</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/claims">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {claims.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No claims yet. Browse found items to submit one.
              </p>
            ) : (
              claims.slice(0, 3).map((claim) => <ClaimCard key={claim.id} claim={claim} />)
            )}
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">My Lost Items</h2>
            <p className="text-sm text-muted-foreground">Items you reported as lost</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/lost">View all</Link>
          </Button>
        </div>
        {lostItems.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              No lost items yet.{" "}
              <Link href="/dashboard/lost/new" className="font-medium text-primary hover:underline">
                Report one now
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {lostItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                type="lost"
                title={item.title}
                description={item.description}
                category={item.category}
                location={item.location}
                date={item.dateLost}
                status={item.status}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">My Found Items</h2>
            <p className="text-sm text-muted-foreground">Items you reported as found</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/found">View all</Link>
          </Button>
        </div>
        {foundItems.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              No found items yet.{" "}
              <Link href="/dashboard/found/new" className="font-medium text-primary hover:underline">
                Report one now
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {foundItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                type="found"
                title={item.title}
                description={item.description}
                category={item.category}
                location={item.location}
                date={item.dateFound}
                status={item.status}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
