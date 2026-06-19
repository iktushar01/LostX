"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UserReportItem } from "@/types/lostx.types";
import { updateUserReportAdminAction } from "@/actions/lostx/user-profile.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export function AdminUserReportsTable({ reports }: { reports: UserReportItem[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleUpdate = async (
    id: string,
    payload: {
      status: string;
      trustFlag?: string;
      suspendUser?: boolean;
    },
  ) => {
    setLoadingId(id);
    const result = await updateUserReportAdminAction(id, payload);
    setLoadingId(null);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Report updated");
    window.location.reload();
  };

  if (reports.length === 0) {
    return <p className="text-sm text-muted-foreground">No user reports pending.</p>;
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <Card key={report.id}>
          <CardHeader className="pb-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base">
                {report.reported.name} reported by {report.reporter.name}
              </CardTitle>
              <Badge variant="outline">{report.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <span className="font-medium">Reason:</span> {report.reason}
            </p>
            <p className="text-muted-foreground">{report.details}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={loadingId === report.id}
                onClick={() => handleUpdate(report.id, { status: "DISMISSED" })}
              >
                {loadingId === report.id ? <Spinner className="h-4 w-4" /> : "Dismiss"}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                disabled={loadingId === report.id}
                onClick={() =>
                  handleUpdate(report.id, { status: "ACTION_TAKEN", trustFlag: "WARNING" })
                }
              >
                Warn user
              </Button>
              <Button
                size="sm"
                variant="destructive"
                disabled={loadingId === report.id}
                onClick={() =>
                  handleUpdate(report.id, {
                    status: "ACTION_TAKEN",
                    trustFlag: "UNDER_REVIEW",
                    suspendUser: true,
                  })
                }
              >
                Suspend user
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
