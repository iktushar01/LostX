"use server";

import { adminService } from "@/services/lostx/admin.service";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { AdminStats } from "@/types/lostx.types";

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
