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
  verificationQuestion?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: ItemUser;
}

export interface LostItemForClaim {
  id: string;
  title: string;
  category: ItemCategory;
  status: LostItemStatus;
  verificationQuestion: string | null;
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
  answer: string;
  status: ClaimStatus;
  userId: string;
  foundItemId: string;
  lostItemId?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: ItemUser;
  foundItem?: FoundItem & { user?: ItemUser };
  lostItem?: {
    id: string;
    title: string;
    verificationQuestion?: string | null;
    verificationAnswer?: string | null;
    status?: LostItemStatus;
    category?: ItemCategory;
  };
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

export interface UserDashboardStats {
  lostReports: number;
  foundReports: number;
  approvedClaims: number;
}

export interface ClaimListFilters {
  search?: string;
  status?: ClaimStatus | "";
}

export type BrowseItem =
  | (LostItem & { itemType: "lost" })
  | (FoundItem & { itemType: "found" });
