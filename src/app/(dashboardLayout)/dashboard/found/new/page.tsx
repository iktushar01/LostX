import { PageHeader } from "@/components/shared/PageHeader";
import { FoundItemForm } from "@/components/found-items/FoundItemForm";

export default function NewFoundItemPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        title="Report Found Item"
        description="Found something on campus? Report it so the owner can browse, find, and claim it."
      />
      <FoundItemForm />
    </div>
  );
}
