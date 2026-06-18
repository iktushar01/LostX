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
  isFeatured?: boolean;
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
  isFeatured?: boolean;
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
  autoApproved?: boolean;
  matchScore?: number | null;
  receivedConfirmedAt?: string | null;
  handoffCode?: string | null;
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
  messages?: ClaimMessage[];
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

export interface AdminAnalytics {
  recoveryRate: number;
  avgDaysToReturn: number;
  returnedItems: number;
  approvedClaims: number;
  autoApprovedClaims: number;
  autoApproveRate: number;
  topLostCategories: { category: ItemCategory; count: number }[];
  topFoundCategories: { category: ItemCategory; count: number }[];
}

export interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  actor?: ItemUser & { role?: string };
}

export interface AdminManagedItem {
  id: string;
  itemType: "lost" | "found";
  title: string;
  description: string;
  category: ItemCategory;
  location: string;
  status: string;
  isFeatured: boolean;
  createdAt: string;
  claimCount: number;
  user?: ItemUser;
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

export interface ScoredMatch {
  id: string;
  title: string;
  category: ItemCategory;
  location: string;
  imageUrl: string | null;
  score: number;
  itemType: "lost" | "found";
}

export interface BrowseMatchSuggestions {
  byLostId: Record<string, ScoredMatch[]>;
  byFoundId: Record<string, ScoredMatch[]>;
}

export interface LostItemDetail extends LostItem {
  suggestedMatches?: ScoredMatch[];
}

export interface FoundItemDetail extends FoundItem {
  suggestedMatches?: ScoredMatch[];
}

export type NotificationType =
  | "CLAIM_APPROVED"
  | "CLAIM_REJECTED"
  | "CLAIM_PENDING"
  | "ITEM_RETURNED"
  | "MATCH_FOUND";

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  href: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface ClaimMessage {
  id: string;
  claimId: string;
  senderId: string;
  content: string;
  createdAt: string;
  sender?: ItemUser;
}

export type ChatbotItemType = "LOST" | "FOUND";

export interface ChatbotMatch {
  id: string;
  type: ChatbotItemType;
  title: string;
  description: string;
  category: ItemCategory;
  location: string;
  imageUrl: string | null;
  status: string;
  date: string;
  similarity: number;
  score: number;
}

export interface ChatbotMeta {
  matchCount: number;
  topSimilarity: number | null;
}

export interface ChatbotResponse {
  answer: string;
  matches: ChatbotMatch[];
  meta: ChatbotMeta;
}
