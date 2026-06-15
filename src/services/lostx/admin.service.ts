import { httpClient } from "@/lib/axios/httpClient";
import { AdminStats } from "@/types/lostx.types";

export const adminService = {
  getStats: () => httpClient.get<AdminStats>("/admin/stats"),
};
