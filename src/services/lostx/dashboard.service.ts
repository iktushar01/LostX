import { httpClient } from "@/lib/axios/httpClient";
import { UserDashboardStats } from "@/types/lostx.types";

export const dashboardService = {
  getStats: () => httpClient.get<UserDashboardStats>("/dashboard/stats"),
};
