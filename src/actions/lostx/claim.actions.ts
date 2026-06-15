"use server";

import { revalidatePath } from "next/cache";
import { claimService } from "@/services/lostx/claim.service";
import { createClaimSchema } from "@/zod/lostx.validation";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

export async function createClaimAction(formData: FormData) {
  const raw = {
    foundItemId: formData.get("foundItemId"),
    message: formData.get("message"),
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

    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to submit claim") };
  }
}

export async function getMyClaimsAction() {
  try {
    const response = await claimService.listMine();
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: [] };
  }
}

export async function getAllClaimsAction() {
  try {
    const response = await claimService.listAll();
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: [] };
  }
}

export async function updateClaimStatusAction(
  claimId: string,
  status: "APPROVED" | "REJECTED",
) {
  try {
    const response = await claimService.updateStatus(claimId, status);

    revalidatePath("/admin/claims");
    revalidatePath("/claims");

    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error: unknown) {
    return { success: false, message: getApiErrorMessage(error, "Failed to update claim") };
  }
}
