import Link from "next/link";
import { getAdminStatsAction } from "@/actions/lostx/admin.actions";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCards } from "@/components/admin/stats-cards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

export default async function AdminDashboardPage() {
  const result = await getAdminStatsAction();

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Admin Dashboard"
        description="Quick overview of LostX platform activity."
      />

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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Claim Review
          </CardTitle>
          <CardDescription>
            Review and approve ownership claims from users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/admin/claims">Go to Claim Management</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
