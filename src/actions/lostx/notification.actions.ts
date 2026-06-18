"use server";

import { notificationService } from "@/services/lostx/notification.service";
import type { NotificationItem } from "@/components/layout/NotificationsMenu";

const notificationKindMap: Record<string, NotificationItem["kind"]> = {
  CLAIM_APPROVED: "claim-approved",
  CLAIM_REJECTED: "claim-rejected",
  CLAIM_PENDING: "claim-pending",
  ITEM_RETURNED: "recovered",
  MATCH_FOUND: "found",
};

export async function getNotificationsAction(limit = 20) {
  try {
    const response = await notificationService.list(limit);
    const items: NotificationItem[] = (response.data ?? []).map((notification) => ({
      id: notification.id,
      title: notification.title,
      description: notification.body,
      href: notification.href ?? "/claims",
      date: new Date(notification.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      kind: notificationKindMap[notification.type] ?? "claim-pending",
    }));

    return { success: true, data: items };
  } catch {
    return { success: true, data: [] as NotificationItem[] };
  }
}

export async function markAllNotificationsReadAction() {
  try {
    await notificationService.markAllAsRead();
    return { success: true };
  } catch {
    return { success: false };
  }
}
