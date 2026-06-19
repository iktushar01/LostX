import { FoundItemForm } from "@/components/found-items/FoundItemForm";
import { ReportItemPageLayout } from "@/components/shared/ReportItemPageLayout";

export default function NewFoundItemPage() {
  return (
    <ReportItemPageLayout variant="found">
      <FoundItemForm />
    </ReportItemPageLayout>
  );
}
