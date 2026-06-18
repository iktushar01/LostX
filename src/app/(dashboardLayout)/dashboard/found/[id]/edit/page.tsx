import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getFoundItemByIdAction } from "@/actions/lostx/found-item.actions";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { EditFoundItemForm } from "@/components/found-items/EditFoundItemForm";

interface EditFoundItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFoundItemPage({ params }: EditFoundItemPageProps) {
  const { id } = await params;
  const [itemResult, userResult] = await Promise.all([
    getFoundItemByIdAction(id),
    getCurrentUserAction(),
  ]);

  if (!itemResult.success || !itemResult.data) notFound();

  const userId = userResult.success ? userResult.data?.id : null;
  if (!userId || itemResult.data.userId !== userId) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/dashboard/found/${id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to report
        </Link>
      </Button>
      <PageHeader
        title="Edit Found Report"
        description="You can edit this report until someone submits a claim."
      />
      <EditFoundItemForm item={itemResult.data} />
    </div>
  );
}

