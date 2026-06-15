export const ITEM_CATEGORIES = [
  "WALLET",
  "PHONE",
  "LAPTOP",
  "KEYS",
  "BAG",
  "BOOK",
  "ID_CARD",
  "OTHER",
] as const;

export type ItemCategory = (typeof ITEM_CATEGORIES)[number];

export type LostItemStatus = "OPEN" | "MATCHED" | "RECOVERED";
export type FoundItemStatus = "AVAILABLE" | "CLAIMED" | "RETURNED";
export type ClaimStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ItemUser {
  id: string;
  name: string;
  email?: string;
}

export interface LostItem {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  imageUrl: string | null;
  location: string;
  dateLost: string;
  status: LostItemStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: ItemUser;
}

export interface FoundItem {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  imageUrl: string | null;
  location: string;
  dateFound: string;
  status: FoundItemStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: ItemUser;
  claims?: { id: string; status: ClaimStatus; createdAt: string }[];
}

export interface Claim {
  id: string;
  message: string;
  status: ClaimStatus;
  userId: string;
  foundItemId: string;
  createdAt: string;
  updatedAt: string;
  user?: ItemUser;
  foundItem?: FoundItem & { user?: ItemUser };
}

export interface BrowseFilters {
  searchTerm?: string;
  category?: ItemCategory | "";
  type?: "all" | "lost" | "found";
}

export interface AdminStats {
  totalLostItems: number;
  totalFoundItems: number;
  totalClaims: number;
  pendingClaims: number;
  approvedClaims: number;
  recoveredItems: number;
}

export interface ClaimListFilters {
  search?: string;
  status?: ClaimStatus | "";
}
