import { PageHeader } from "@/components/shared/PageHeader";
import { LostItemForm } from "@/components/lost-items/LostItemForm";

export default function NewLostItemPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        title="Report Lost Item"
        description="Describe your lost item and set a verification question — you'll need it when claiming a matching found item."
      />
      <LostItemForm />
    </div>
  );
}
