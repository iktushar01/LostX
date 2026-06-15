import { PageHeader } from "@/components/shared/PageHeader";
import { LostItemForm } from "@/components/lost-items/LostItemForm";

export default function NewLostItemPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Report Lost Item"
        description="Provide details to help others identify your lost item."
      />
      <LostItemForm />
    </div>
  );
}
