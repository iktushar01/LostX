import { LostItemForm } from "@/components/lost-items/LostItemForm";
import { ReportItemPageLayout } from "@/components/shared/ReportItemPageLayout";

export default function NewLostItemPage() {
  return (
    <ReportItemPageLayout variant="lost">
      <LostItemForm />
    </ReportItemPageLayout>
  );
}
