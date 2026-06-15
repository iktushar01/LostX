import { PageHeader } from "@/components/shared/PageHeader";
import { FoundItemForm } from "@/components/found-items/FoundItemForm";

export default function NewFoundItemPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Report Found Item"
        description="Help reunite someone with their lost belongings."
      />
      <FoundItemForm />
    </div>
  );
}
