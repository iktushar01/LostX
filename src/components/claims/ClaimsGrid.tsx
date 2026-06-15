import Link from "next/link";
import { Claim } from "@/types/lostx.types";
import { ClaimCard } from "./ClaimCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { HandHelping } from "lucide-react";

interface ClaimsGridProps {
  claims: Claim[];
}

export function ClaimsGrid({ claims }: ClaimsGridProps) {
  if (claims.length === 0) {
    return (
      <EmptyState
        title="No Claims Submitted"
        description="Browse found items and submit a claim when you recognize something as yours."
        icon={<HandHelping className="h-6 w-6" />}
        actionLabel="Browse Items"
        actionHref="/browse"
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {claims.map((claim) => (
        <ClaimCard key={claim.id} claim={claim} />
      ))}
    </div>
  );
}
