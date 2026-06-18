import { AdminAnalytics } from "@/types/lostx.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatLabel } from "@/components/shared/ItemBadges";

interface AnalyticsPanelProps {
  analytics: AdminAnalytics;
}

export function AnalyticsPanel({ analytics }: AnalyticsPanelProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recovery rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{analytics.recoveryRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg days to return</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{analytics.avgDaysToReturn}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Auto-approve rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{analytics.autoApproveRate}%</p>
            <p className="text-xs text-muted-foreground">{analytics.autoApprovedClaims} of {analytics.approvedClaims} approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Items returned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{analytics.returnedItems}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top lost categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {analytics.topLostCategories.map((row) => (
              <div key={row.category} className="flex justify-between">
                <span>{formatLabel(row.category)}</span>
                <span className="font-mono font-medium">{row.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top found categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {analytics.topFoundCategories.map((row) => (
              <div key={row.category} className="flex justify-between">
                <span>{formatLabel(row.category)}</span>
                <span className="font-mono font-medium">{row.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
