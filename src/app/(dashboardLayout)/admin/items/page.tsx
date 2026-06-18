import { PageHeader } from "@/components/shared/PageHeader";
import { AdminItemsTable } from "@/components/admin/items-table";
import { getAdminItemsAction } from "@/actions/lostx/admin.actions";

interface AdminItemsPageProps {
  searchParams: Promise<{ type?: string; search?: string }>;
}

export default async function AdminItemsPage({ searchParams }: AdminItemsPageProps) {
  const { type = "lost", search } = await searchParams;

  const result = await getAdminItemsAction({
    type: type === "found" ? "found" : "lost",
    search,
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHeader
        title="Manage Items"
        description="Remove spam reports and feature important items for campus visibility."
      />
      <AdminItemsTable
        items={result.data}
        initialType={type}
        initialSearch={search ?? ""}
      />
    </div>
  );
}

