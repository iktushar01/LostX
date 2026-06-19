"use server";

import { revalidatePath } from "next/cache";
import { userProfileService } from "@/services/lostx/user-profile.service";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

export async function getAccountSummaryAction() {
  try {
    const response = await userProfileService.getAccountSummary();
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
}

export async function getPublicProfileAction(id: string) {
  try {
    const response = await userProfileService.getPublicProfile(id);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
}

export async function getUserReviewsAction(id: string, page = 1) {
  try {
    const response = await userProfileService.listReviews(id, { page, limit: 10 });
    return { success: true, data: response.data ?? [], meta: response.meta };
  } catch {
    return { success: false, data: [], meta: undefined };
  }
}

export async function createUserReviewAction(
  revieweeId: string,
  payload: { claimId: string; rating: number; comment?: string },
) {
  try {
    const response = await userProfileService.createReview(revieweeId, payload);
    revalidatePath(`/users/${revieweeId}`);
    return { success: true, message: response.message };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to submit review") };
  }
}

export async function createUserReportAction(payload: {
  reportedId: string;
  reason: string;
  details: string;
  claimId?: string;
  lostItemId?: string;
  foundItemId?: string;
}) {
  try {
    const response = await userProfileService.createReport(payload);
    return { success: true, message: response.message };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to submit report") };
  }
}

export async function deleteAccountAction(payload: { email: string; password?: string }) {
  try {
    const response = await userProfileService.deleteAccount(payload);
    return { success: true, message: response.message, data: response.data };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to delete account") };
  }
}

export async function getEligibleReviewClaimsAction(revieweeId: string) {
  try {
    const response = await userProfileService.getEligibleReviewClaims(revieweeId);
    return { success: true, data: response.data ?? [] };
  } catch {
    return { success: false, data: [] };
  }
}

export async function getUserReportsAdminAction(status?: string) {
  try {
    const response = await userProfileService.listReportsAdmin(status);
    return { success: true, data: response.data ?? [] };
  } catch {
    return { success: false, data: [] };
  }
}

export async function updateUserReportAdminAction(
  id: string,
  payload: {
    status: string;
    adminNote?: string;
    trustFlag?: string;
    suspendUser?: boolean;
  },
) {
  try {
    const response = await userProfileService.updateReportAdmin(id, payload);
    revalidatePath("/admin/user-reports");
    return { success: true, message: response.message, data: response.data };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to update report") };
  }
}
