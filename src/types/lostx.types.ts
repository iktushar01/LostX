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
  privateDescriptionPlain?: string | null;
  category: ItemCategory;
  imageUrl: string | null;
  location: string;
  dateLost: string;
  status: LostItemStatus;
  isFeatured?: boolean;
  showImagePublic?: boolean;
  showDescriptionPublic?: boolean;
  showLocationPublic?: boolean;
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
  verificationQuestion?: string | null;
  hasPrivateDetails?: boolean;
}

export interface FoundItem {
  id: string;
  title: string;
  description: string;
  privateDescriptionPlain?: string | null;
  category: ItemCategory;
  imageUrl: string | null;
  location: string;
  dateFound: string;
  status: FoundItemStatus;
  isFeatured?: boolean;
  showImagePublic?: boolean;
  showDescriptionPublic?: boolean;
  showLocationPublic?: boolean;
  userId: string;
  linkedLostItemId?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: ItemUser;
  claims?: { id: string; status: ClaimStatus; createdAt: string }[];
}

export type AiRecommendation = "APPROVE" | "REVIEW" | "REJECT";

export interface AiVerificationQuestion {
  id: string;
  question: string;
}

export interface AiVerificationAnswer {
  id: string;
  answer: string;
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
  aiQuestions?: AiVerificationQuestion[] | null;
  aiAnswers?: AiVerificationAnswer[] | null;
  aiConfidence?: number | null;
  aiRecommendation?: AiRecommendation | null;
  receivedConfirmedAt?: string | null;
  handoffCode?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: ItemUser;
  foundItem?: FoundItem & {
    user?: ItemUser;
    privateDescriptionPlain?: string | null;
  };
  lostItem?: {
    id: string;
    title: string;
    description?: string;
    privateDescriptionPlain?: string | null;
    verificationQuestion?: string | null;
    status?: LostItemStatus;
    category?: ItemCategory;
    showImagePublic?: boolean;
    showDescriptionPublic?: boolean;
    showLocationPublic?: boolean;
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
  | "MATCH_FOUND"
  | "POSSIBLE_RETURN";

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
