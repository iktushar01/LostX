import Link from "next/link";
import {
  FileSearch,
  HandHelping,
  PackageSearch,
  Search,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { getDashboardStatsAction } from "@/actions/lostx/dashboard.actions";
import { getMyLostItemsAction } from "@/actions/lostx/lost-item.actions";
import { getMyFoundItemsAction } from "@/actions/lostx/found-item.actions";
import { getMyClaimsAction } from "@/actions/lostx/claim.actions";
import { DashboardStatsCards } from "@/components/dashboard/DashboardStatsCards";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { ItemCard } from "@/components/shared/ItemCard";
import { ClaimsList } from "@/components/claims/ClaimsList";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const [statsResult, lostResult, foundResult, claimsResult] = await Promise.all([
    getDashboardStatsAction(),
    getMyLostItemsAction(6),
    getMyFoundItemsAction(6),
    getMyClaimsAction(5),
  ]);

  const stats = statsResult.data ?? {
    lostReports: 0,
    foundReports: 0,
    approvedClaims: 0,
  };

  const lostItems = lostResult.data ?? [];
  const foundItems = foundResult.data ?? [];
  const claims = claimsResult.data ?? [];

  return (
    <div className="space-y-8 p-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your lost & found activity."
      />

      <DashboardStatsCards stats={stats} />

      <DashboardSection
        title="My Lost Items"
        description="Items you have reported as lost."
        icon={Search}
        action={
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/lost/new">Report lost item</Link>
          </Button>
        }
        viewAllHref="/dashboard/lost"
      >
        {lostItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">No lost items reported yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
      </DashboardSection>

      <DashboardSection
        title="My Found Items"
        description="Items you have reported as found."
        icon={PackageSearch}
        action={
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/found/new">Report found item</Link>
          </Button>
        }
        viewAllHref="/dashboard/found"
      >
        {foundItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">No found items reported yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
      </DashboardSection>

      <DashboardSection
        title="My Claims"
        description="Ownership claims you have submitted."
        icon={HandHelping}
        action={
          <Button variant="outline" size="sm" asChild>
            <Link href="/browse">Browse items</Link>
          </Button>
        }
        viewAllHref="/claims"
      >
        {claims.length === 0 ? (
          <p className="text-sm text-muted-foreground">No claims submitted yet.</p>
        ) : (
          <ClaimsList claims={claims} />
        )}
      </DashboardSection>

      <DashboardSection
        title="Quick Actions"
        description="Common tasks to get started."
        icon={FileSearch}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/browse">Browse all items</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/lost/new">Report lost item</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/found/new">Report found item</Link>
          </Button>
        </div>
      </DashboardSection>
    </div>
  );
}
