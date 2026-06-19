import { httpClient } from "@/lib/axios/httpClient";
import {
  AccountSummary,
  PublicProfile,
  UserReportItem,
  UserReviewItem,
} from "@/types/lostx.types";

export const userProfileService = {
  getAccountSummary: () => httpClient.get<AccountSummary>("/users/me/account"),

  getPublicProfile: (id: string) => httpClient.get<PublicProfile>(`/users/${id}/profile`),

  listReviews: (id: string, params?: { page?: number; limit?: number }) =>
    httpClient.get<UserReviewItem[]>(`/users/${id}/reviews`, { params }),

  getEligibleReviewClaims: (id: string) =>
    httpClient.get<{ claimId: string; itemTitle: string }[]>(
      `/users/${id}/reviews/eligible-claims`,
    ),

  createReview: (revieweeId: string, data: { claimId: string; rating: number; comment?: string }) =>
    httpClient.post(`/users/${revieweeId}/reviews`, data),

  createReport: (data: {
    reportedId: string;
    reason: string;
    details: string;
    claimId?: string;
    lostItemId?: string;
    foundItemId?: string;
  }) => httpClient.post("/users/reports", data),

  deleteAccount: (data: { email: string; password?: string }) =>
    httpClient.post<{ id: string }>("/auth/delete-account", data),

  listReportsAdmin: (status?: string) =>
    httpClient.get<UserReportItem[]>("/users/admin/reports", { params: status ? { status } : {} }),

  updateReportAdmin: (
    id: string,
    data: {
      status: string;
      adminNote?: string;
      trustFlag?: string;
      suspendUser?: boolean;
    },
  ) => httpClient.patch<UserReportItem>(`/users/admin/reports/${id}`, data),
};
