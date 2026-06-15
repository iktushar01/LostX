"use server";

import { dashboardService } from "@/services/lostx/dashboard.service";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

export async function getDashboardStatsAction() {
  try {
    const response = await dashboardService.getStats();
    return { success: true, data: response.data };
  } catch (error: unknown) {
    return {
      success: false,
      data: { lostReports: 0, foundReports: 0, approvedClaims: 0 },
      message: getApiErrorMessage(error, "Failed to load dashboard stats"),
    };
  }
}
