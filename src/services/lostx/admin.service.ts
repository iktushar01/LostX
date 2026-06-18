import { httpClient } from "@/lib/axios/httpClient";
import { AdminManagedItem, AdminStats } from "@/types/lostx.types";

export const adminService = {
  getStats: () => httpClient.get<AdminStats>("/admin/stats"),
  getAnalytics: () => httpClient.get<import("@/types/lostx.types").AdminAnalytics>("/admin/analytics"),
  getAuditLogs: (limit = 50) =>
    httpClient.get<import("@/types/lostx.types").AuditLogEntry[]>("/admin/audit-logs", {
      params: { limit },
    }),
  listItems: (params?: Record<string, unknown>) => httpClient.get<AdminManagedItem[]>("/admin/items", { params }),
  setItemFeatured: (type: "lost" | "found", id: string, isFeatured: boolean) =>
    httpClient.patch<AdminManagedItem>(`/admin/items/${type}/${id}/feature`, { isFeatured }),
  deleteItem: (type: "lost" | "found", id: string) =>
    httpClient.delete<{ id: string }>(`/admin/items/${type}/${id}`),
};
