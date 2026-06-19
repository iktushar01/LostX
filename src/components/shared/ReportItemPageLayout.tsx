import { ReportItemSidePanel } from "@/components/shared/ReportItemSidePanel";

interface ReportItemPageLayoutProps {
  variant: "lost" | "found";
  children: React.ReactNode;
}

export function ReportItemPageLayout({ variant, children }: ReportItemPageLayoutProps) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">{children}</div>
        <ReportItemSidePanel variant={variant} />
      </div>
    </div>
  );
}
