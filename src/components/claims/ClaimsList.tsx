import { Claim } from "@/types/lostx.types";
import { ClaimsGrid } from "./ClaimsGrid";

interface ClaimsListProps {
  claims: Claim[];
}

/** @deprecated Use ClaimsGrid for full page; this re-exports for compatibility */
export function ClaimsList({ claims }: ClaimsListProps) {
  return <ClaimsGrid claims={claims} />;
}

export { ClaimsGrid } from "./ClaimsGrid";
export { ClaimCard } from "./ClaimCard";
