import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getLostItemByIdAction } from "@/actions/lostx/lost-item.actions";
import { getCurrentUserAction } from "@/actions/_getCurrentUserAction";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { EditLostItemForm } from "@/components/lost-items/EditLostItemForm";

interface EditLostItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditLostItemPage({ params }: EditLostItemPageProps) {
  const { id } = await params;
  const [itemResult, userResult] = await Promise.all([
    getLostItemByIdAction(id),
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
        <Link href={`/dashboard/lost/${id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to report
        </Link>
      </Button>
      <PageHeader
      />
      <EditLostItemForm item={itemResult.data} />
    </div>
  );
}

