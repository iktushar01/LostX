"use server";

import { revalidatePath } from "next/cache";
import { claimService } from "@/services/lostx/claim.service";
import { createClaimSchema } from "@/zod/lostx.validation";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { ClaimListFilters } from "@/types/lostx.types";

export async function createClaimAction(formData: FormData) {
  const raw = {
    foundItemId: formData.get("foundItemId"),
    lostItemId: formData.get("lostItemId"),
    answer: formData.get("answer"),
  };

  const parsed = createClaimSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Validation failed",
    };
  }

  try {
    const response = await claimService.create(parsed.data);

    revalidatePath("/claims");
    revalidatePath(`/dashboard/found/${parsed.data.foundItemId}`);
    revalidatePath("/admin/claims");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to submit claim") };
  }
}

export async function getMyClaimsAction(limit?: number) {
  try {
    const response = await claimService.listMine();
    const data = limit ? (response.data ?? []).slice(0, limit) : response.data;
    return { success: true, data };
  } catch {
    return { success: false, data: [] };
  }
}

export async function getAllClaimsAction(filters?: ClaimListFilters) {
  try {
    const response = await claimService.listAll(filters);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    return {
      success: false,
      data: [],
      message: getApiErrorMessage(error, "Failed to load claims"),
    };
  }
}

export async function getClaimByIdAction(claimId: string) {
  try {
    const response = await claimService.getById(claimId);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    return {
      success: false,
      message: getApiErrorMessage(error, "Claim not found"),
    };
  }
}

export async function updateClaimStatusAction(
  claimId: string,
  status: "APPROVED" | "REJECTED",
) {
  try {
    const response = await claimService.updateStatus(claimId, status);

    revalidatePath("/admin/claims");
    revalidatePath("/admin");
    revalidatePath("/claims");
    revalidatePath("/dashboard");
    if (claimId) {
      revalidatePath(`/admin/claims/${claimId}`);
    }

    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to update claim") };
  }
}

export async function getClaimMessagesAction(claimId: string) {
  try {
    const response = await claimService.listMessages(claimId);
    return { success: true, data: response.data ?? [] };
  } catch (error: unknown) {
    return {
      success: false,
      data: [],
      message: getApiErrorMessage(error, "Failed to load messages"),
    };
  }
}

export async function sendClaimMessageAction(claimId: string, content: string) {
  try {
    const response = await claimService.sendMessage(claimId, content);
    revalidatePath(`/claims/${claimId}`);
    revalidatePath(`/admin/claims/${claimId}`);
    return { success: true, data: response.data, message: response.message };
  } catch (error: unknown) {
    return {
      success: false,
      message: getApiErrorMessage(error, "Failed to send message"),
    };
  }
}
