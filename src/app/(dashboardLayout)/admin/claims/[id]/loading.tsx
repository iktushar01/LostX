import { Skeleton } from "@/components/ui/skeleton";

export default function AdminClaimDetailLoading() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-9 w-36" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-56 rounded-xl" />
        <Skeleton className="h-56 rounded-xl" />
        <Skeleton className="h-72 rounded-xl lg:col-span-2" />
      </div>
      <Skeleton className="h-28 rounded-xl" />
    </div>
  );
}
