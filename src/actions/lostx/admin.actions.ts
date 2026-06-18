"use server";

import { adminService } from "@/services/lostx/admin.service";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { AdminManagedItem, AdminStats } from "@/types/lostx.types";
import { revalidatePath } from "next/cache";

export async function getAdminStatsAction(): Promise<{
  success: boolean;
  data?: AdminStats;
  message?: string;
}> {
  try {
    const response = await adminService.getStats();
    return { success: true, data: response.data };
  } catch (error: unknown) {
    return {
      success: false,
      message: getApiErrorMessage(error, "Failed to load dashboard statistics"),
    };
  }
}

export async function getAdminAnalyticsAction() {
  try {
    const response = await adminService.getAnalytics();
    return { success: true, data: response.data };
  } catch (error: unknown) {
    return {
      success: false,
      message: getApiErrorMessage(error, "Failed to load analytics"),
    };
  }
}

export async function getAdminItemsAction(params?: Record<string, unknown>): Promise<{
  success: boolean;
  data: AdminManagedItem[];
  message?: string;
}> {
  try {
    const response = await adminService.listItems(params);
    return { success: true, data: response.data ?? [] };
  } catch (error: unknown) {
    return {
      success: false,
      data: [],
      message: getApiErrorMessage(error, "Failed to load items"),
    };
  }
}

export async function toggleAdminItemFeaturedAction(
  type: "lost" | "found",
  id: string,
  isFeatured: boolean,
) {
  try {
    const response = await adminService.setItemFeatured(type, id, isFeatured);
    revalidatePath("/admin/items");
    revalidatePath("/browse");
    return { success: true, data: response.data, message: response.message };
  } catch (error: unknown) {
    return {
      success: false,
      message: getApiErrorMessage(error, "Failed to update featured state"),
    };
  }
}

export async function deleteAdminItemAction(type: "lost" | "found", id: string) {
  try {
    const response = await adminService.deleteItem(type, id);
    revalidatePath("/admin/items");
    revalidatePath("/browse");
    revalidatePath("/dashboard");
    return { success: true, data: response.data, message: response.message };
  } catch (error: unknown) {
    return {
      success: false,
      message: getApiErrorMessage(error, "Failed to remove item"),
    };
  }
}
