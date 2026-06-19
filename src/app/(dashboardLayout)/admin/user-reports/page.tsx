import Link from "next/link";
import { getUserReportsAdminAction } from "@/actions/lostx/user-profile.actions";
import { AdminUserReportsTable } from "@/components/admin/AdminUserReportsTable";
import { Button } from "@/components/ui/button";

export default async function AdminUserReportsPage() {
  const result = await getUserReportsAdminAction("PENDING");
  const reports = result.data ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">User reports</h1>
          <p className="text-sm text-muted-foreground">
            Review reports from users. No automatic suspensions — admin action required.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin">Back to admin</Link>
        </Button>
      </div>
      <AdminUserReportsTable reports={reports} />
    </div>
  );
}
