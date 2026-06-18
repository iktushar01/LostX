import { httpClient } from "@/lib/axios/httpClient";
import { AppNotification } from "@/types/lostx.types";

export const notificationService = {
  list: (limit = 20) =>
    httpClient.get<AppNotification[]>("/notifications", { params: { limit } }),

  markAsRead: (id: string) =>
    httpClient.patch<AppNotification>(`/notifications/${id}/read`, {}),

  markAllAsRead: () =>
    httpClient.patch<void>("/notifications/read-all", {}),
};
